import ApiConfig, { adminWalletAddress } from "src/config/APIConfig";
import axios from "axios";
import React, { useRef, useState, useEffect, useContext } from "react";
import Draggable from "react-draggable";
import {
  Window,
  WindowHeader,
  WindowContent,
  TabBody,
  Button,
  TextField,
  // TextArea,
} from "react95";
import { onDragWindow } from "src/hooks/operations";
import moment from "moment";
import { toast } from "react-toastify";
import { toWeiDecimals } from "src/hooks/address";
import { AuthContext } from "src/context/Auth";
import { getAddress, signTransaction } from "sats-connect";
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {
    console.log("Error: ", err);
  };
};
export default function BuyModal({
  activeBuy,
  close,
  select,

  inscription,
  GetFeatureListAPI,
  index,
}) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  const windowRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const auth = useContext(AuthContext);
  const [boundMove, setBoundMove] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  const handleDrag = () => {
    select();
    const position = onDragWindow(windowRef.current);
    setBoundMove(position);
  };
  const [image, setImage] = useState(null);
  const [image12, setImage12] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [countData, setCountData] = useState(
    inscription?.bookedSlot?.length == 0
      ? 1
      : inscription?.bookedSlot?.length === 1
      ? 2
      : 3
  );
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    tag: "",
    discription: "",
  });
  const [isValidUrl, setIsValidUrl] = useState(true);
  const _onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(
    window.sessionStorage.getItem("walletType"),
    " ----- walletType -----"
  );
  const uploadtFileHandler = async () => {
    if (
      formData.title !== "" &&
      formData.tag !== "" &&
      image !== null &&
      isValidUrl
    ) {
      const formImage = new FormData();
      formImage.append("file", image);
      // if (window.sessionStorage.getItem("walletType") === "Xverse") {
      //   payWithXverse(
      //     "https://res.cloudinary.com/duagenpze/image/upload/v1689599177/v1q5wagnbuua2pnjvae5.png"
      //   );
      // }

      try {
        setIsLoading(true);
        const uploadFile = await axios({
          method: "POST",
          url: ApiConfig.uploadImage,
          headers: {
            token: sessionStorage.getItem("token"),
          },
          data: formImage,
        });
        if (uploadFile.data.response_code === 200) {
          if (window.sessionStorage.getItem("walletType") === "UniSat") {
            payWithUnisat(uploadFile.data.result.url);
          }
          if (window.sessionStorage.getItem("walletType") === "Hiro") {
            payWithHiro(uploadFile.data.result.url);
          }
          if (window.sessionStorage.getItem("walletType") === "Xverse") {
            payWithXverse(uploadFile.data.result.url);
          }
          // buyHandler(uploadFile.data.result.url);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      setIsSubmit(true);
    }
  };

  const payWithXverse = async (url) => {
    try {
      let address = window.sessionStorage.getItem("walletAddress");
      const signPsbtOptions = {
        payload: {
          network: {
            type: "Testnet",
          },
          message: "Sign Transaction",
          psbtBase64: `cHNidP8BAJwCAmO+JvQJxhVDDpm3tV5PmPfzvJOSL4GOdjEOpAAAAAAnrAAA==`,
          broadcast: false,
          inputsToSign: [
            {
              address: address,
              signingIndexes: [1],
            },
          ],
        },
        onFinish: (response) => {
          console.log(response.psbtBase64);
          alert(response.psbtBase64);
        },
        onCancel: () => alert("Canceled"),
      };

      await signTransaction(signPsbtOptions);
    } catch (e) {
      console.log("---err", e);
    }
  };
  const payWithUnisat = async (url) => {
    // buyHandler(url);
    try {
      const balance = await window.unisat.getBalance();
      let TotalsBalance = balance.total / 100000000;
      if (inscription?.price > 0) {
        if (inscription?.price < TotalsBalance) {
          let txid = await window.unisat.sendBitcoin(
            adminWalletAddress,
            Number(toWeiDecimals(inscription.price, 8))
          );
          console.log(txid);
          buyHandler(url);
        } else {
          setIsLoading(false);
          toast.error(
            `Insufficient balance. Non-Inscription balance(${balance.total} BTC) is lower than  ${inscription.price} BTC`
          );
        }
      } else {
        buyHandler(url);
      }
      // buyHandler(url);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      toast.error(e.message);
    }
  };
  const payWithHiro = async (url) => {
    // buyHandler(url);
    try {
      if (inscription?.price > 0) {
        const resp = await window.btc?.request("sendTransfer", {
          address: adminWalletAddress, // need to change client wallet address
          amount: toWeiDecimals(inscription.price, 8).toString(), // need to send Amount
        });
        buyHandler(url);
      } else {
        buyHandler(url);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      toast.error(e.message);
    }
  };
  const buyHandler = async (url) => {
    try {
      let count = 1;
      count =
        inscription?.bookedSlot?.length == 0
          ? moment().format("YYYY-MM-DD")
          : inscription?.bookedSlot?.length == 1
          ? moment().add(1, "day").format("YYYY-MM-DD")
          : moment().add(2, "day").format("YYYY-MM-DD");
      let date;
      const res = await axios({
        method: "POST",
        url: ApiConfig.buySlot,
        headers: {
          token: sessionStorage.getItem("token"),
        },
        data: {
          title: formData.title,
          url: url,
          clickTags: formData.tag,
          inscription: inscription?.inscription,
          date: count,
          // date: moment().add(count, "day").format("YYYY-MM-DD"),
          // date: moment().format("YYYY-MM-DD"),
          position: index + 1,
          info: formData.discription,
        },
      });
      if (res.data.response_code === 200) {
        GetFeatureListAPI();
        toast.success(res.data.response_message);
        setIsLoading(false);
        close();
      } else {
        setIsLoading(false);
        toast.error(res.data.response_message);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    setErrorMessage("");
    const file = event.target.files[0];
    const selectedImage = new Image();

    selectedImage.onload = function () {
      const width = this.width;
      const height = this.height;

      // Perform validation on the width and height
      if ((width > 1000 && height > 1000) || (width < 1000 && height < 1000)) {
        setErrorMessage(
          "Image dimensions must be 1000px width and 1000px height."
        );
        // Optionally, you can reset the selected image to null
        setImage(null);
      } else {
        // Image dimensions are valid, proceed with further actions.
        // For example, you can set the selected image in the component's state.
        setImage(file);
        getBase64(file, (result) => {
          setImage12(result);
        });
        setImage12(URL.createObjectURL(file));
        setErrorMessage("");
      }
    };
    // Load the selected image file
    const reader = new FileReader();
    reader.onload = function (e) {
      selectedImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    GetBalance();
  }, []);

  const GetBalance = async (url) => {
    try {
      let balance;
      if (window.sessionStorage.getItem("walletType") === "UniSat") {
        const unisatBalance = await window.unisat.getBalance();
        balance = unisatBalance.total / 100000000;
      }
      if (window.sessionStorage.getItem("walletType") === "Hiro") {
      }
      console.log(" ------ balance ", balance);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      bounds={boundMove}
      position={null}
      onDrag={handleDrag}
      allowAnyClick={true}
      handle=".move"
    >
      <Window
        className="window"
        ref={windowRef}
        style={activeBuy ? { zIndex: 129 } : { zIndex: 109 }}
      >
        <WindowHeader className="window-header" active={activeBuy}>
          {inscription?.inscriptionNumber}
          <div className="displayEnd">
            <Button onClick={() => close()} className="closeButton">
              <span className="close-icon" />
            </Button>
          </div>
        </WindowHeader>
        <WindowContent className="window-content">
          <div className="graph-tab d-flex align-flex-start">
            <div style={{ width: "100%" }}>
              <div className="dFlex">
                {inscription.bookedSlot &&
                  inscription.bookedSlot.length === 0 && (
                    <p>
                      Your ad will be visible on{" "}
                      {moment().add(countData, "day").format("DD-MM-YYYY")}
                    </p>
                  )}
                <div>
                  {inscription.bookedSlot &&
                    inscription.bookedSlot.length > 0 && (
                      <div className=" m-b-5">
                        <h5>
                          Start Date:{" "}
                          {moment(
                            inscription.bookedSlot &&
                              inscription.bookedSlot[0].endDate
                          ).format("DD-MM-YYYY")}
                        </h5>
                        <h5>
                          End Date:{" "}
                          {moment(
                            inscription.bookedSlot &&
                              inscription.bookedSlot[0].endDate
                          )
                            .add(1, "day")
                            .format("DD-MM-YYYY")}
                        </h5>
                      </div>
                    )}
                </div>

                <p style={{ padding: "3px 0px" }}>
                  Service fees : &nbsp;{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {inscription?.price}
                  </span>
                </p>
              </div>

              <TabBody
                className="tab-body m-t-20"
                style={{
                  height: "calc(100% - 30px)",
                  borderStyle: "none",
                  borderColor: "none",
                  boxShadow: "none",
                }}
              >
                <div>
                  <div style={{ width: "100%" }}>
                    {" "}
                    <TextField
                      name="title"
                      disabled={isLoading}
                      fullWidth
                      placeholder="Ad title"
                      onChange={_onChange}
                    />
                    {isSubmit && formData.title === "" && (
                      <p style={{ color: "red", paddingTop: "7px" }}>
                        Please enter title.
                      </p>
                    )}
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div style={{ width: "100%" }}>
                    <TextField
                      name="tag"
                      disabled={isLoading}
                      fullWidth
                      placeholder="Click tag URL"
                      onChange={(e) => {
                        if (e.target.value) {
                          const inputUrl = e.target.value;
                          setIsValidUrl(urlRegex.test(inputUrl));
                          setFormData({
                            ...formData,
                            [e.target.name]: inputUrl,
                          });
                        }
                      }}
                    />
                    {isSubmit && formData.tag === "" && (
                      <p style={{ color: "red", paddingTop: "7px" }}>
                        Please enter tag URL.
                      </p>
                    )}
                    {!isValidUrl && (
                      <p style={{ color: "red", paddingTop: "7px" }}>
                        Please enter a valid URL.
                      </p>
                    )}
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div style={{ width: "100%" }}>
                    <textarea
                      rows={5}
                      cols={50}
                      // rows={4} // Number of rows to display
                      name="discription"
                      disabled={isLoading}
                      fullWidth
                      style={{
                        width: "100%",
                        position: "relative",
                        boxSizing: "border-box",
                        padding: "2px",
                        fontSize: "1rem",
                        borderStyle: "solid",
                        borderWidth: "2px",
                        borderColor:
                          "rgb(132, 133, 132) rgb(254, 254, 254) rgb(254, 254, 254) rgb(132, 133, 132)",
                        lineHeight: "1.5",
                        display: "flex",
                        alignItems: "center",
                        minHeight: "36px",
                        background: "rgb(255, 255, 255)",
                      }}
                      placeholder="Project discription"
                      onChange={(e) => {
                        if (e.target.value) {
                          const inputUrl = e.target.value;
                          // setIsValidUrl(urlRegex.test(inputUrl));
                          setFormData({
                            ...formData,
                            [e.target.name]: inputUrl,
                          });
                        }
                      }}
                    />
                    {isSubmit && formData.discription === "" && (
                      <p style={{ color: "red", paddingTop: "7px" }}>
                        Please enter discription.
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ paddingTop: "5px", paddingBottom: "5px" }}></div>
                {image ? (
                  <div className="displayCenter">
                    <div>
                      <img
                        src={image12}
                        style={{
                          height: "100%",
                          maxWidth: "200px",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                      <Button
                        fullWidth
                        style={{ maxWidth: "75%" }}
                        onClick={() => {
                          setImage(null);
                          setErrorMessage("");
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      accept="image/png, image/gif, image/jpeg,.svg"
                      id="myfile"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="myfile">
                      <div
                        className="displayCenter textfiledborder"
                        style={{
                          padding: "10px ",
                          background: "#dbdb6e",
                          // border: "1px solid black",
                          cursor: "pointer",
                        }}
                      >
                        <p>Upload</p>
                      </div>
                    </label>
                  </>
                )}
                {isSubmit && image === null && (
                  <p style={{ color: "red", paddingTop: "7px" }}>
                    Please select file
                  </p>
                )}
                {errorMessage ? (
                  <p
                    style={{
                      color: "red",
                      paddingTop: "7px",
                      textAlign: "center",
                    }}
                  >
                    {errorMessage}
                  </p>
                ) : (
                  <p
                    style={{
                      color: "#000",
                      paddingTop: "7px",
                      textAlign: "center",
                    }}
                  >
                    Image dimensions 1000px width and 1000px height.
                  </p>
                )}
                <div style={{ marginTop: "10px" }}>
                  <Button
                    disabled={isLoading}
                    onClick={() => uploadtFileHandler()}
                  >
                    {isLoading ? "Buying..." : "Buy"}{" "}
                  </Button>
                </div>
              </TabBody>
            </div>
          </div>
        </WindowContent>
      </Window>
    </Draggable>
  );
}
