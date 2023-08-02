import React, { useState, useRef, useEffect, useContext } from "react";
// import axios from "axios";
import { Window, WindowHeader, WindowContent, Button } from "react95";
import Draggable from "react-draggable";
import { onDragWindow } from "src/hooks/operations";
import { getAddress, XverseWallet } from "sats-connect";
// import WallectConnect from "src/component/WalletConnect/WallectConnect";
// import { showConnect } from "@stacks/connect";
// import { userSession } from "../../hooks/userSession";
import ApiConfig, { NETWORK_TYPE } from "src/config/APIConfig";
// import { signXverseTrx } from "src/component/BlockChainTrx";
import { toast } from "react-toastify";
import axios from "axios";
// import { StacksTestnet, StacksMainnet } from "@stacks/network";
// import XverseWallet from "xverse-wallet";

import { AuthContext } from "src/context/Auth";

export default function ConnectWallet({ active, close, select, title }) {
  const windowRef = useRef(null);

  //************************************************************** */
  const unisat = window.unisat;
  // // const HiroWalletProvider = window.HiroWalletProvider;
  // // const BitcoinProvider = window.BitcoinProvider;
  const selfRef = useRef({
    accounts: [],
  });
  const auth = useContext(AuthContext);
  const [connectedWalletName, setConnectedWalletName] = useState(false);
  const [loadingUniSat, setLoadingUniSat] = useState(false);
  const [loadingHiro, setLoadingHiro] = useState(false);
  const [loadingXverse, setLoadingXverse] = useState(false);
  // const [accounts, setAccounts] = useState([]);
  // const [address, setAddress] = useState("");
  // const [publicKey, setPublicKey] = useState("");
  // const [network, setNetwork] = useState("livenet");
  // const [balance, setBalance] = useState({
  //   confirmed: 0,
  //   unconfirmed: 0,
  //   total: 0,
  // });

  // ************************************ UniSat Wallet ************************************

  const getUniSatBasicInfo = async () => {
    try {
      // const unisat = window.unisat;
      // const [address] = await unisat.getAccounts();
      // if (!address) {
      //   return;
      // }
      // setAddress(address);
      // const publicKey = await unisat.getPublicKey();
      // // console.log("publicKey-- unisat", publicKey);
      // setPublicKey(publicKey);
      // const network = await unisat.getNetwork();
      // console.log("network-- unisat", network);
      // setNetwork(network);
      // const balance = await unisat.getBalance();
      // let TotalsBalance = balance.total / 100000000;
      // console.log(TotalsBalance, "balance-- unisat", balance);
      // setBalance(balance);
    } catch (err) {
      console.log("err--", err);
    }
  };
  useEffect(() => {
    getUniSatBasicInfo();
  }, []);
  const SwitchUniSatNetwork = async (network) => {
    try {
      let res = await unisat.switchNetwork(network);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const SignInUniSatNetwork = async () => {
    try {
      let res = await window.unisat.signMessage(
        "Sign into " + window.location.host
      );
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
      toast.error(e?.message);
      return;
    }
  };
  const requestUniSat = async () => {
    try {
      setLoadingUniSat(true);
      const result = await unisat.requestAccounts();
      handleAccountsChanged(result);

      setLoadingUniSat(false);
      const [senderAddress] = await unisat.getAccounts();
      const getNetwork = await unisat.getNetwork();
      if (getNetwork == "testnet") {
        const SwitchNetwork = await SwitchUniSatNetwork("livenet");
      }
      // const SignIn = await SignInUniSatNetwork();
      // if (!SignIn) {
      //   return;
      // }
      GetFeatureListAPI(senderAddress, "UniSat");
    } catch (err) {
      console.log("err-- unisat", err);
      toast.error(err?.message);
      setLoadingUniSat(false);
    }
  };
  const self = selfRef.current;
  const handleAccountsChanged = (_accounts) => {
    try {
      if (self.accounts[0] === _accounts[0]) {
        // prevent from triggering twice
        return;
      }
      self.accounts = _accounts;
      if (_accounts.length > 0) {
        // setAccounts(_accounts);
        // setConnected(true);
        // setAddress(_accounts[0]);
        // getUniSatBasicInfo();
      } else {
        // setConnected(false);
      }
    } catch (err) {
      console.log("err--", err);
    }
  };

  // ************************************ Hiro Wallet ************************************

  const handleHiroWallet = async () => {
    try {
      // *********************************** Testing Wallet ***********************************
      if (window.HiroWalletProvider) {
        // Hiro Wallet is installed 🎉
        // Connect to Hiro Wallet
        setLoadingHiro(true);
        const provider = await window.btc?.request("getAddresses");
        // const networkType2 = await window.btc?.listen();
        // console.log(networkType2, "networkType2 address:");
        const networkType = await handleHiroWalletAPI(
          provider?.result?.addresses[0]?.address
        );
        console.log(networkType, "networkType ---");
        // const networkType = await window.btc?.request("supportedMethods");
        // const networkType = window.btc.networkType;

        // GetFeatureListAPI(provider?.result?.addresses[0]?.address, "Hiro");

        console.log(
          "Connected address:",
          provider?.result?.addresses[0]?.address
        );
        setLoadingHiro(false);
      } else {
        setLoadingHiro(false);
        toast.error("Wallet not found");
        console.log("Wallet not found");
      }
      // *********************************** Testing Wallet ***********************************
      // Perform further actions with the connected wallet
    } catch (error) {
      setLoadingHiro(false);
      console.log("----- error123444", error);
      toast.error(error?.error?.message);
    }
  };

  const handleHiroWalletAPI = async (address) => {
    try {
      const result = await axios({
        url: `https://blockstream.info/api/address/${address}`,
        method: "get",
      })
        .then((data) => {
          const addresses = data.addresses;
          const networkType = data.network;
          GetFeatureListAPI(address, "Hiro");
          console.log("Bitcoin network type:", networkType);
          console.log("Addresses:", addresses);
          return true;
        })
        .catch((error) => {
          // console.error("Error: ---- 123", error);
          toast.error("Please switch to mainnet first!");
          return false;
        });
      console.log("Addresses:", result);
    } catch (error) {
      return false;
      console.error("Error: ---- 345", error);
    }
  };

  const handleXverseWallet = async () => {
    try {
      /* ******************************************* */
      // setLoadingXverse(true);
      const getAddressOptions = {
        payload: {
          purposes: ["ordinals", "payment"],
          message: "Address for receiving Ordinals",
          network: {
            type: NETWORK_TYPE,
          },
        },
        onFinish: (response) => {
          console.log(
            response.addresses[1],
            " ------ address ------",
            response
          );
          window.sessionStorage.setItem(
            "walletAddress",
            response.addresses[0].address
          );
          window.sessionStorage.setItem(
            "walletAddress2",
            response.addresses[1].address
          );
          // signXverseTrx(response.addresses);
          GetFeatureListAPI(response.addresses[1].address, "Xverse");
          setLoadingXverse(false);
        },
        onCancel: (Request) => {
          setLoadingXverse(false);
          // alert("Request canceled");
          toast.error("Request canceled");
        },
      };
      await getAddress(getAddressOptions);
      console.log(" response 123 response ", XverseWallet);

      /* ******************************************* */

      // let wallet = await XverseWallet.connect();
      // console.log(" ------ wallet ", wallet);
      /* ******************************************* */
    } catch (error) {
      setLoadingXverse(false);
      // toast.error(error?.message);
      console.log("error", error);
    }
  };
  //************************************************************** */

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

  const GetFeatureListAPI = async (walletAddress, walletName) => {
    try {
      const result = await axios({
        url: ApiConfig.connectWallet,
        method: "post",
        data: { walletAddress: walletAddress },
      });

      if (result.data.response_code === 200) {
        close();
        setConnectedWalletName(walletName);
        toast.success(result.data.response_message);
        window.sessionStorage.setItem("token", result.data.result.token);
        window.sessionStorage.setItem("walletType", walletName);
        if (result.data.result.token) {
          auth.getProfileData(result.data.result.token);
        }
      }
    } catch (err) {
      console.log("err", err);
      // setAssets([]);
      // setIsLoading(false);
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
        className="window connectWallet"
        ref={windowRef}
        style={active ? { zIndex: 129 } : { zIndex: 109 }}
      >
        <WindowHeader className="window-header" active={active}>
          <span className="move" style={{ width: "100%" }} onClick={select}>
            {title}
          </span>
          <Button onClick={() => close()}>
            <span className="close-icon" />
          </Button>
        </WindowHeader>
        <WindowContent className="window-content no-padding">
          {/* <h1 className="m-b-10">
              Lorem ipsum may be used as a placeholder before final copy is
              available.{" "}
            </h1> */}
          <div className="displayColumn" mt={2} style={{ marginTop: "0px" }}>
            {" "}
            {/* <Button
              onClick={() => handleXverseWallet()}
              style={{ marginRight: "10px", width: "80%", height: "55px" }}
              disabled={loadingXverse}
            >
              <img
                src="images/xverseLogo.webp"
                alt="whitepaper"
                style={{ width: "30px", padding: "10px" }}
              />
              Xverse Wallet{" "}
              {loadingXverse && (
                <img
                  src="images/buttonLoading.gif"
                  alt="whitepaper"
                  style={{ width: "25px", padding: "10px" }}
                />
              )}
            </Button>{" "}
           
            &nbsp; */}
            {/* <div
              onClick={() => handleXverseWallet()}
              disabled={loadingXverse}
              className="connectmodalBox displayCenter"
              style={{ width: "92%", background: "#e2e293", cursor: "pointer" }}
            >
              <img
                src="images/xverseLogo.webp"
                alt="whitepaper"
                style={{ width: "30px", padding: "10px" }}
              />
              Xverse Wallet{" "}
              {loadingXverse && (
                <img
                  src="images/buttonLoading.gif"
                  alt="whitepaper"
                  style={{ width: "25px", padding: "10px" }}
                />
              )}
            </div>{" "}
            &nbsp; */}
            <div
              onClick={() => requestUniSat()}
              disabled={loadingUniSat}
              className="connectmodalBox displayCenter"
              style={{ width: "92%", background: "#e2e293", cursor: "pointer" }}
            >
              <img
                src="images/unisatLogo.webp"
                alt="whitepaper"
                style={{ width: "30px", padding: "10px" }}
              />
              UniSat Wallet{" "}
              {loadingUniSat && (
                <img
                  src="images/buttonLoading.gif"
                  alt="whitepaper"
                  style={{ width: "25px", padding: "10px" }}
                />
              )}
            </div>{" "}
            &nbsp;
            <div
              onClick={() => handleHiroWallet()}
              disabled={loadingHiro}
              className="connectmodalBox displayCenter"
              style={{ width: "92%", background: "#e2e293", cursor: "pointer" }}
            >
              <img
                src="images/stacksLogo.webp"
                alt="whitepaper"
                style={{ width: "30px", padding: "10px" }}
              />
              Hiro Wallet{" "}
              {loadingHiro && (
                <img
                  src="images/buttonLoading.gif"
                  alt="whitepaper"
                  style={{ width: "25px", padding: "10px" }}
                />
              )}
            </div>
          </div>
        </WindowContent>
      </Window>
    </Draggable>
  );
}
