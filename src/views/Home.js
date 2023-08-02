import React, { useState, useEffect, useContext } from "react";
// import useIsMountedRef from "src/hooks/useIsMountedRef";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { AuthContext } from "src/context/Auth";
// import moment from "moment";

export default function Home() {
  const stopMarque = () => {
    document.getElementById("marque").stop();
  };
  const startMarque = () => {
    document.getElementById("marque").start();
  };
  // const isMountedRef = useIsMountedRef();
  const [data, setData] = useState(); // eslint-disable-line
  const [topVote, setTopVote] = useState([]); // eslint-disable-line
  const [isLoading, setIsLoading] = useState(true); // eslint-disable-line
  const auth = useContext(AuthContext);
  const GetTopCoinsListAPI = async () => {
    try {
      setIsLoading(true);
      const result = await axios({
        url: ApiConfig.topCoins,
        method: "get",
      });
      if (result.data.response_code === 200) {
        setData(result.data.result);
        setIsLoading(false);
        // ListData();
        // handlerDeleteClose();
      }
    } catch (err) {
      console.log("err", err);
      setIsLoading(false);
    }
  };
  const VoteApiHandler = async (id) => {
    try {
      // setIsLoading1(true);
      const result = await axios({
        url: ApiConfig.topVotes,
        method: "get",
      });
      setTopVote(result.data.result);
    } catch (err) {
      console.log("err", err);
      window.sessionStorage.removeItem("token");
    }
  };
  useEffect(() => {
    GetTopCoinsListAPI();
    VoteApiHandler();
  }, [auth?.userLoggedIn]); //eslint-disable-line
  return (
    <>
      <div
        id="desktop-background"
        style={{ background: `url(images/banner.png)` }}
      >
        {/* <div
          className="homeMarqueePre"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        > */}
        <marquee
          className="homeMarquee"
          behavior="scroll"
          id="marque"
          direction="left"
          onMouseOver={stopMarque}
          onMouseOut={startMarque}
        >
          {auth?.userLoggedIn && (
            <strong>
              Ordinal Points :
              <span
                style={{
                  borderRight: "1px solid #fff",
                  margin: "0px 20px 0px 0px",
                }}
              >
                {auth?.userData?.ordinalPoints}
              </span>
            </strong>
          )}
          &nbsp;&nbsp;
          {auth?.userLoggedIn && (
            <>
              <strong>Trending Inscriptions :</strong>
              {topVote &&
                topVote?.map((item, index) => {
                  return (
                    <span key={`topCoins${index}`}>
                      {index + 1}{" "}
                      {item?.adId?.userTitle
                        ? item?.adId?.userTitle
                        : item?.adId?.title}
                      . <b>{item?.adId?.inscriptionNumber}</b>
                    </span>
                  );
                })}
            </>
          )}
        </marquee>
        {/* <div className="scroll-container">
          <p className="scrolling-text">
            {auth?.userLoggedIn && (
              <strong>
                Ordinal Points :
                <span
                  style={{
                    borderRight: "1px solid #fff",
                    margin: "0px 20px 0px 0px",
                  }}
                >
                  {auth?.userData?.ordinalPoints}
                </span>
              </strong>
            )}
            &nbsp;&nbsp;
            <strong>Trending Inscriptions :</strong>
            {topVote &&
              topVote?.map((item, index) => {
                return (
                  <span key={`topCoins${index}`}>
                    {index + 1}{" "}
                    {item?.adId?.userTitle
                      ? item?.adId?.userTitle
                      : item?.adId?.title}
                    . <b>{item?.adId?.inscriptionNumber}</b>
                  </span>
                );
              })}
          </p>
        </div> */}
        <div className="home-text"></div>
      </div>
    </>
  );
}
