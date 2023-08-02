import React, { useState, useEffect, useContext } from "react";
import { Button } from "react95";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import moment from "moment";
import BuyModal from "./BuyModal";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";

export default function FeaturedList({ searchToken, select, setendTime }) {
  // const [Assets, setAssets] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [inscription, setInscription] = useState("");
  const [index, setindex] = useState(0);
  const [isLoading1, setIsLoading1] = useState(false); // eslint-disable-line
  const accessToken = window.sessionStorage.getItem("token");
  const VoteApiHandler = async (id) => {
    try {
      setIsLoading1(true);
      const result = await axios({
        url: `${ApiConfig.addVotes}/${id}`,
        method: "get",
        // data: { _id: rowId },
        headers: {
          token: accessToken,
        },
      });
      auth.GetFeatureListAPI();
      if (result.data.response_code === 200) {
        auth.getProfileData(sessionStorage.getItem("token"));
        console.log("res", result.data);
        setIsLoading1(false);
        toast.success(result.data.response_message);
      } else {
        toast.error(result.data.response_message);
      }
      setIsLoading1(false);
    } catch (err) {
      console.log("err", err);
      auth.setAssets([]);
      setIsLoading1(false);
      window.sessionStorage.removeItem("token");
    }
  };
  useEffect(() => {
    auth.GetFeatureListAPI();
  }, []);
  // const GetFeatureListAPI = async () => {
  //   try {
  //     setIsLoading(true);
  //     // const result = window.sessionStorage.getItem("token");
  //     const result = await axios({
  //       url: ApiConfig.inscriptionsList,
  //       method: "get",
  //       headers: {
  //         token: sessionStorage.getItem("token"),
  //       },

  //       params: {
  //         limit: 100,
  //       },
  //     });
  //     if (result.data.response_code === 200) {
  //       setAssets(result.data.result.docs);
  //       const now = new Date();
  //       setendTime(
  //         moment(
  //           new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  //         )
  //       );
  //       setIsLoading(false);
  //       // ListData();
  //       // handlerDeleteClose();
  //     }
  //   } catch (err) {
  //     console.log("err", err);
  //     setAssets([]);
  //     setIsLoading(false);
  //     window.sessionStorage.removeItem("token");
  //   }
  // };
  // useEffect(() => {
  //   GetFeatureListAPI();
  // }, []); //eslint-disable-line
  const getProfileData = async (token) => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.profile,
        headers: {
          token: token,
        },
      });
      if (res.data.response_code === 200) {
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
  return (
    <>
      {" "}
      <div className="contentgrid">
        {auth.Assets &&
          auth.Assets.map((item, index) => {
            return (
              <div className="collectionBox">
                <div className="contentBox dFlex">
                  <h1 style={{ fontSize: "20px" }}>{item.inscriptionNumber}</h1>

                  <div className="imageSection">
                    {item.totalVotes} &nbsp;{" "}
                    {item?.isVote ? (
                      <>
                        <img
                          src={"/images/upport.png"}
                          alt="CollectionImage"
                          className="featureImg1"
                          style={{
                            filter: "hue-rotate(180deg)",
                            cursor: "not-allowed",
                          }}
                        />
                      </>
                    ) : (
                      <img
                        src={"/images/upport.png"}
                        alt="CollectionImage"
                        className="featureImg1"
                        onClick={() => {
                          if (!accessToken) {
                            select("btcWallet");
                          } else {
                            VoteApiHandler(item._id);
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="imageSection">
                  <img
                    src={item?.addedBy === "USER" ? item?.userUrl : item.url}
                    alt="CollectionImage"
                    className="featureImg"
                    onClick={() => window.open(item.clickTags)}
                  />
                </div>

                <div className="contentBox">
                  <div className="dFlex">
                    <h1 style={{ fontSize: "20px" }}>
                      {item?.addedBy === "USER" ? item?.userTitle : item.title}
                    </h1>
                  </div>
                  <div
                    style={{ marginTop: "7px", alignItems: "flex-start" }}
                    className="dFlex"
                  >
                    <div style={{ marginTop: "7px" }} className="">
                      <Button
                        style={{ marginRight: "5px", marginBottom: "5px" }}
                        onClick={() => {
                          if (item?.addedBy === "USER") {
                            window.open(item.userClickTags);
                          } else {
                            window.open(item.clickTags);
                          }
                        }}
                      >
                        Project Link
                      </Button>
                      <Button
                        style={{ marginRight: "5px", marginBottom: "5px" }}
                        onClick={() => {
                          // select("btcWallet");
                          select("infoBox");
                          auth.setProjectInfo(item);
                        }}
                      >
                        Project Info
                      </Button>
                    </div>
                    <Button
                      style={{ marginRight: "5px", marginBottom: "5px" }}
                      // onClick={() => window.open(item.clickTags)}
                      disabled={item.bookedSlot.length === 3}
                      onClick={() => {
                        if (!accessToken) {
                          select("btcWallet");
                        } else {
                          setOpen(true);
                          setInscription(item);
                          setindex(index);
                        }
                      }}
                    >
                      Buy Slot
                    </Button>

                    {/* <Button
                    disabled
                    style={{ marginRight: "5px", marginBottom: "5px" }}
                  >
                    Game
                  </Button>
                  <Button disabled style={{ marginBottom: "5px" }}>
                    Buy Listing
                  </Button> */}
                  </div>
                </div>
              </div>
            );
          })}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {!auth.isLoading && auth.Assets.length == 0 && <p>No Data Found</p>}
          {auth.isLoading && (
            <div>
              <img
                src="images/buttonLoading.gif"
                alt="whitepaper"
                style={{ width: "80px" }}
              />
            </div>
          )}
        </div>
      </div>
      {open && (
        <BuyModal
          inscription={inscription}
          activeBuy={open}
          close={() => setOpen(false)}
          GetFeatureListAPI={auth.GetFeatureListAPI}
          index={index}
        />
      )}
    </>
  );
}
