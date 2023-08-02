import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import moment from "moment";
export const AuthContext = createContext();

const setSession = (accessToken) => {
  if (accessToken) {
    sessionStorage.setItem("token", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    sessionStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

function checkLogin(token) {
  const accessToken = window.sessionStorage.getItem("token")
    ? window.sessionStorage.getItem("token")
    : token;
  return accessToken ? true : false;
}

export default function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(checkLogin());
  // console.log("isLogin ----", isLogin);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [Assets, setAssets] = useState([]);
  const [projectInfo, setProjectInfo] = useState({});
  const [endTime, setendTime] = useState(
    moment(new Date()).add(23, "h").subtract(23, "m").unix()
  );
  const GetFeatureListAPI = async () => {
    try {
      // const result = window.sessionStorage.getItem("token");
      const result = await axios({
        url: ApiConfig.inscriptionsList,
        method: "get",
        headers: {
          token: sessionStorage.getItem("token"),
        },

        params: {
          limit: 100,
        },
      });
      if (result.data.response_code === 200) {
        setAssets(result.data.result.docs);
        const now = new Date();
        setendTime(
          moment(
            new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
          )
        );
        setIsLoading(false);
        // ListData();
        // handlerDeleteClose();
      }
    } catch (err) {
      console.log("err", err);
      setAssets([]);
      setIsLoading(false);
      window.sessionStorage.removeItem("token");
    }
  };
  useEffect(() => {
    GetFeatureListAPI();
  }, [isLogin]); //eslint-disable-line
  const getProfileData = async (token) => {
    // console.log("token===", token);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.profile,
        headers: {
          token: token ? token : sessionStorage.getItem("token"),
        },
      });
      if (res.data.response_code === 200) {
        setUserData(res.data.result);
        setIsLogin(true)
        window.sessionStorage.setItem(
          "userProfileordinalPoints",
          res.data.result.ordinalPoints
        );
        window.sessionStorage.setItem(
          "userProfileprofilePic",
          res.data.result.profilePic
        );
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (sessionStorage.getItem("token"))
      getProfileData(sessionStorage.getItem("token"));
  }, [sessionStorage.getItem("token")]);

  let data = {
    userLoggedIn: isLogin,
    endTime,
    setTimeout,
    projectInfo,
    setProjectInfo,
    isLoading,
    Assets,
    userData,
    GetFeatureListAPI: () => GetFeatureListAPI(),
    userLogIn: (type, data) => {
      setSession(data);
      setIsLogin(type);
    },
    setIsLogin,
    getProfileData: () => {
      getProfileData(sessionStorage.getItem("token"));
    },
    checkLogin: (token) => {
      checkLogin(token);
    },
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
