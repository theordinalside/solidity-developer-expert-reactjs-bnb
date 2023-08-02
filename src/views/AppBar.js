import React, { useEffect, useState, useContext } from "react";
import { Button, Toolbar, AppBar, List, ListItem, Panel } from "react95";
// import Wallet from "src/views/Wallet";
import { toast } from "react-toastify";
import Router from "src/views/Router";
import WhitePaper from "src/views/Router/WhitePaper";
// import Info from "src/views/Info";
import Welcome from "src/views/Welcome";
import TextInfo from "src/views/TextInfo";
import CopyToClipboard from "react-copy-to-clipboard";
// import Paint from "src/views/Paint";
// import Router from "src/views/Solitaire";
// import Router from "src/views/Solitaire";
import Solitaire from "src/views/Solitaire";
import OrdinalMarketPlace from "src/views/OrdinalMarketPlace";

import OridinalSattribute from "src/views/OridinalSattribute";
import OrdinalExplore from "src/views/OrdinalExplore";
import OrdinalsWallet from "src/views/OrdinalsWallet";
import Minesweeper from "src/views/Minesweeper";
import Brc from "src/views/Brc";
import BoreBnb from "src/views/BoreBnb";
// import AddScreen from "src/views/AddScreen";
// import Contact from "src/views/Contact";
import Terms from "src/views/Terms";
import { AuthContext } from "src/context/Auth";
import { sortAddress } from "src/utils";
import { checkMetaMask } from "src/hooks/operations";
import Timer from "src/views/Timer";
import ConnectWallet from "./ConnectWallet";
import { FiCopy } from "react-icons/fi";
// import { useLocation } from "react-router-dom";

export default function BottomBar({ crtAccount, chainId }) {
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState({
    // wallet: { active: false, open: false },
    boreBnb: { active: true, open: true },
    weth: { active: false, open: false },

    // paint: { active: false, open: false },

    whitePaper: { active: false, open: false },
    oridinalSattribute: { active: false, open: false },
    ordinalExplore: { active: false, open: false },
    brc: { active: false, open: false },
    ordinalsWallet: { active: false, open: false },
    ordinalMarketPlace: { active: false, open: false },
    minesweeper: { active: false, open: false },
    solitaire: { active: false, open: false },
    btcWallet: { active: false, open: false },
    welcome: { active: false, open: false },
    infoBox: { active: false, open: false },
    terms: { active: false, open: false },
    router: { active: false, open: false },
  });
  const [refresh, setRefresh] = useState(false);
  // const [preview, setPreview] = useState("");
  const [start, setStart] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      setStart(false);
    };

    if (start) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [start]);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  const [activeRauterTab, setActiveRauterTab] = useState(0);
  const isMetaMask = checkMetaMask();
  const [isConnected, setIsConnectd] = useState(false);
  // const [isLoading, setIsloading] = useState(true);
  const [infoData, setInfoData] = useState({}); // eslint-disable-line

  // const [comingSoon, setComingSoon] = useState(true);
  // const openInfoBox = (data) => {
  //   changeTab("infoBox");
  //   setInfoData(data);
  // };
  // const openInfoboreBnb = (data) => {
  //   changeTab("boreBnb");
  //   setInfoData(data);
  // };

  const changeTab = (name, activeTab) => {
    // console.log(activeTab, "temp =-=-=-= temp", name);
    if (activeTab) {
      setActiveRauterTab(activeTab);
    } else {
      setActiveRauterTab(0);
    }
    const temp = { ...open };
    Object.keys(temp).forEach((key) => {
      if (key !== name) {
        temp[key] = { ...temp[key], active: false };
      }
    });
    temp[name] = { active: true, open: true };
    setOpen(temp);
  };
  const closeTab = (name) => {
    const temp = { ...open };
    const crtActive = temp[name].active;
    temp[name] = { active: false, open: false };

    if (crtActive) {
      const data = Object.keys(temp).map((key) => {
        return { key, value: temp[key] };
      });
      for (let i = 0; i < data.length; i++) {
        if (data[i].value.open) {
          temp[data[i].key] = { active: true, open: true };
          break;
        }
      }
    }

    setOpen(temp);
  };
  useEffect(() => {
    if (isMetaMask && crtAccount !== null) {
      setIsConnectd(true);
      // setIsloading(false);
    } else {
      setIsConnectd(false);
    }
    // setIsloading(false);
  }, [crtAccount, isMetaMask]);

  // useEffect(() => {
  //   document.addEventListener("click", () => {
  //     setStart(false);
  //   });
  //   // const crtDate = new Date();
  //   // const endDate = new Date(LgeEndDate);
  //   // if (crtDate.getTime() >= endDate.getTime()) {
  //   //   setComingSoon(false);
  //   // }
  // }, []);
  // const connect = async () => {
  //   const res = await connectToWallet();
  //   if (res === "connected") {
  //     setIsConnectd(true);
  //   }
  // };
  const disconnectWalletHandler = async () => {
    try {
      // toast.success("You have been disconnected successfully!");
      window.sessionStorage.removeItem("userProfileordinalPoints");
      window.sessionStorage.removeItem("userProfileprofilePic");
      window.sessionStorage.removeItem("token");
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* {!isConnected && isMetaMask && ( */}
      {!auth.userData.walletAddress && (
        <div className="connect-button d-flex no-responsive justify-center">
          <Button
            style={{ padding: 20, color: "#000" }}
            onClick={() => changeTab("btcWallet")}
          >
            {/* <img
            src="images/metamask-fox.svg"
            width="30"
            alt=""
            className="m-r-10"
          /> */}
            <strong>Connect</strong>
          </Button>
        </div>
      )}
      {/* )} */}
      {/* {isConnected && crtAccount && ( */}
      {auth.userData.walletAddress && (
        <div className="connect-button d-flex no-responsive justify-center">
          <Button
            style={{ padding: 20 }}
            onClick={() => disconnectWalletHandler()}
          >
            <strong>Disconnect </strong>{" "}
          </Button>
          <CopyToClipboard
            text={auth.userData.walletAddress}
            style={{
              color: "#000",
              cursor: "pointer",
              fontSize: "14px",
              marginLeft: "1px",
              height: "40px",
            }}
          >
            <Button
              style={{ padding: 20 }}
              onClick={() => toast.success("Copied")}
            >
              <strong>
                {auth?.userData?.walletAddress &&
                  sortAddress(auth.userData.walletAddress)}
              </strong>{" "}
              &nbsp;
              <FiCopy />
            </Button>
          </CopyToClipboard>
        </div>
      )}
      {/* )}  */}
      <div className="desktop-link">
        <div style={{ display: "flex" }}>
          <div
            className="desktop-icon"
            onClick={() => changeTab("minesweeper")}
          >
            <img src="images/minesweeper-32x32.png" alt="" />
            Minesweeper
          </div>
          {/* <div
            className="desktop-icon"
            style={{ width: "auto" }}
            onClick={() => changeTab("ordinalMarketPlace")}
          >
            <img src="images/my-documents-32x32.png" alt="" />
            Ordinal Marketplace{" "}
          </div>{" "} */}
          {/* 
          <div
            className="desktop-icon"
            onClick={() => changeTab("ordinalsWallet")}
          >
            <img src="images/my-documents-32x32.png" alt="" />
            Ordinals Wallet{" "}
          </div>{" "}
          <div className="desktop-icon" onClick={() => changeTab("brc")}>
            <img src="images/my-documents-32x32.png" alt="" />
            Brc 20{" "}
          </div>{" "}
          <div
            className="desktop-icon"
            onClick={() => changeTab("ordinalExplore")}
          >
            <img src="images/my-documents-32x32.png" alt="" />
            Ordinals Explorer{" "}
          </div>
          <div
            className="desktop-icon"
            onClick={() => changeTab("oridinalSattribute")}
          >
            <img src="images/my-documents-32x32.png" alt="" />
            Ordinals Sattributes{" "}
          </div>{" "} */}
        </div>{" "}
        <div style={{ display: "flex" }}>
          <div className="desktop-icon" onClick={() => changeTab("solitaire")}>
            <img src="images/Solitaire_Vista_Icon.png" alt="" />
            Solitaire
          </div>
          {/* <div
            className="desktop-icon"
            onClick={() => changeTab("ordinalsWallet")}
          >
            <img src="images/my-documents-32x32.png" alt="" />
            Ordinals Wallet{" "}
          </div>{" "} */}
        </div>{" "}
        <div style={{ display: "flex" }}>
          <div
            className="desktop-icon"
            onClick={() => {
              window.open(`https://t.me/theordinalside`, "_blank");
            }}
          >
            <img src="images/telegram-32x32.png" alt="" />
            Telegram
          </div>
          {/* <div className="desktop-icon" onClick={() => changeTab("brc")}>
            <img src="images/my-documents-32x32.png" alt="" />
            Brc 20{" "}
          </div>{" "} */}
        </div>{" "}
        <div style={{ display: "flex" }}>
          <div
            className="desktop-icon"
            onClick={() => {
              window.open(`https://twitter.com/TheOrdinalSide`, "_blank");
            }}
          >
            <img src="images/twitter-32x32.png" alt="" />
            Twitter
          </div>
          {/* <div
            className="desktop-icon"
            onClick={() => changeTab("ordinalExplore")}
          >
            <img src="images/my-documents-32x32.png" alt="" />
            Ordinals Explorer{" "}
          </div> */}
        </div>{" "}
        <div style={{ display: "flex" }}>
          <div
            className="desktop-icon"
            onClick={() => {
              window.open(`https://discord.com/invite/CXKdw9BNVd`, "_blank");
            }}
          >
            <img src="images/discord.png" alt="" />
            Discord
          </div>
          {/* <div
            className="desktop-icon"
            onClick={() => changeTab("oridinalSattribute")}
          >
            <img src="images/my-documents-32x32.png" alt="" />
            Ordinals Sattributes{" "}
          </div>{" "} */}
        </div>{" "}
        <div style={{ display: "flex" }}>
          <div
            className="desktop-icon"
            onClick={() => {
              window.open(
                `https://dune.com/dgtl_assets/bitcoin-ordinals-analysis`,
                "_blank"
              );
            }}
          >
            <img src="images/original_logo.svg" alt="" />
            Ordinals Analytics{" "}
          </div>
        </div>{" "}
        <div style={{ display: "flex" }}>
          <div className="desktop-icon" onClick={() => changeTab("whitePaper")}>
            <img src="images/whitepaper_icon.png" alt="" />
            Phase 1{" "}
          </div>
        </div>
        {/* <div
          className="desktop-icon"
          onClick={() => {
            window.open(
              `https://bnbvault-finance.medium.com/introducing-bore-638f766d0d23`,
              "_blank"
            );
          }}
        >
          <img src="images/medium-32x32.png" alt="" />
          Medium
        </div> */}
        {/* <div
          className="desktop-icon"
          onClick={() => {
            window.open(`https://github.com/borevault`, "_blank");
          }}
        >
          <img src="images/github-32x32.png" alt="" />
          Github
        </div> */}
        {/* <div
          className="desktop-icon"
          onClick={() => {
            window.open(
              `https://bscscan.com/address/0x62D7aA57125169101626a993fa46685313A774Ce`,
              "_blank"
            );
          }}
        >
          <img src="images/bscscan.png" alt="" />
          Bscscan
        </div> */}
      </div>
      {/* <AddScreen openInfoBox={(item) => openInfoBox(item)} /> */}
      {/* <Contact openInfoBox={(item) => openInfoBox(item)} /> */}
      {start && (
        <List className="start-menu" open={start}>
          {/* <ListItem onClick={() => changeTab("wallet")}>
            <span role="img">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAHlBMVEUAAAAAAACAgADAwMCAgID///+AAAD//wAAAP//AACHNrbBAAAAAXRSTlMAQObYZgAAAAFiS0dEBfhv6ccAAAAHdElNRQfiBhoANiJ7wILjAAABBUlEQVQoz42RsW6DMBCGnSgPwB0W7ohzKMz2Ne1aQ6WqY5UXKEt2KJLnbDxBn7cHIgIy9d/u0//b/9lK/Us7ED3OKwKzkof5DmY/kN0C7d06gYys14AuusEVQHao1xF6gZTtAogda/bJHaTMlzNWoBZAZ3bFt9ofj/nUg70cWieqjLGagGROBSX72Js+HzPM/CXLlq9tmCwpVbWTS0vbvhmpt0OfZRgEdBo+BABRBYW0MMbGiHIo++esqq0ytjMjGDSR1f6zMZ0pe1RPw01aZtdfaGOMIVcgBAa4Nj8myN5KBSHDcMvA9ThVFzIiEEM+r3cQBEYMm89LF8P8Cu9bg/TbGhb9AWxsMvM7D72qAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI2VDAwOjU0OjM0LTA0OjAwggzQfQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNlQwMDo1NDozNC0wNDowMPNRaMEAAAAASUVORK5CYII="
                alt="icon"
              />
            </span>
            Wallet
          </ListItem> */}
          <ListItem onClick={() => changeTab("router")}>
            <span role="img">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAJ1BMVEUAAACAgIDAwMAAAAD///8AgIAA//8AAP+AAIAAAID//wCAgAD/AADTdjT5AAAAAXRSTlMAQObYZgAAAAFiS0dEBI9o2VEAAAAHdElNRQfiBBMBJTN2lZVeAAABBklEQVQoz1XQsWrDMBAGYBlBabcKefJmp1O8uFKbwdkSlUB2v4K9hlK4vkKeoHSsm0nZoq1Z82A9KYokH9igD37dnQixxWyRWFmFVTYJzKSUU3jrugAuf4W+72/5Vwt3ALDz+QCfPv/MWNkMCBsPwrZF+LDQIWBM8qECBR5elFJ8eFcbhBK7YkQKPsATgG+LlzK+uHaRLo9fc/8F8E1yZYu7oR/2e0JyTGDeAQ2rsASouyNZPanwaNS/itZsAgUvvNygXWr9mADX3BQ/EbLx9De2vxGKup7XSxMgO2xP49nICO1B1x6InTRft6uzEbMwprisj0ZUcQcqLhLfLdmEitXk7PbG/z/0JkoyIM7uGAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNC0xOVQwMTozNzo1MS0wNDowMGGLZNcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDQtMTlUMDE6Mzc6NTEtMDQ6MDAQ1txrAAAAAElFTkSuQmCC"
                alt="icon"
              />
            </span>
            Welcome
          </ListItem>
          {/* <ListItem onClick={() => changeTab("paint")}>
            <span role="img">
              <img src="images/paint-32x32.png" alt="icon" />
            </span>
            Paint
          </ListItem> */}
          <ListItem onClick={() => changeTab("minesweeper")}>
            <span role="img">
              <img src="images/minesweeper-32x32.png" alt="icon" />
            </span>
            Minesweeper
          </ListItem>
          <ListItem onClick={() => changeTab("solitaire")}>
            <span role="img">
              <img src="images/Solitaire_Vista_Icon.png" alt="icon" />
            </span>
            Solitaire
          </ListItem>
        </List>
      )}
      <AppBar id="appBar">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setStart(!start);
              }}
              active={start}
              className={`image-button start ${start ? "active" : ""}`}
            >
              <img src="images/start.png" alt="icon" />
              <span>Start</span>
            </Button>
            {/* <Button
              onClick={() => changeTab("welcome")}
              active={open.welcome.active}
              className={`image-button ${open.welcome.active ? "active" : ""}`}
            >
              <img src="images/my-documents-32x32.png" alt="icon" />
              <span>Welcome</span>
            </Button> */}
            {/* <Button
              onClick={() => changeTab("wallet")}
              active={open.wallet.active}
              className={`image-button ${open.wallet.active ? "active" : ""}`}
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAHlBMVEUAAAAAAACAgADAwMCAgID///+AAAD//wAAAP//AACHNrbBAAAAAXRSTlMAQObYZgAAAAFiS0dEBfhv6ccAAAAHdElNRQfiBhoANiJ7wILjAAABBUlEQVQoz42RsW6DMBCGnSgPwB0W7ohzKMz2Ne1aQ6WqY5UXKEt2KJLnbDxBn7cHIgIy9d/u0//b/9lK/Us7ED3OKwKzkof5DmY/kN0C7d06gYys14AuusEVQHao1xF6gZTtAogda/bJHaTMlzNWoBZAZ3bFt9ofj/nUg70cWieqjLGagGROBSX72Js+HzPM/CXLlq9tmCwpVbWTS0vbvhmpt0OfZRgEdBo+BABRBYW0MMbGiHIo++esqq0ytjMjGDSR1f6zMZ0pe1RPw01aZtdfaGOMIVcgBAa4Nj8myN5KBSHDcMvA9ThVFzIiEEM+r3cQBEYMm89LF8P8Cu9bg/TbGhb9AWxsMvM7D72qAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI2VDAwOjU0OjM0LTA0OjAwggzQfQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNlQwMDo1NDozNC0wNDowMPNRaMEAAAAASUVORK5CYII="
                alt="icon"
              />
              <span>Wallet</span>
            </Button> */}
            <Button
              onClick={() => changeTab("router")}
              active={open.router.active}
              className={`image-button ${open.router.active ? "active" : ""}`}
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAJ1BMVEUAAACAgIDAwMAAAAD///8AgIAA//8AAP+AAIAAAID//wCAgAD/AADTdjT5AAAAAXRSTlMAQObYZgAAAAFiS0dEBI9o2VEAAAAHdElNRQfiBBMBJTN2lZVeAAABBklEQVQoz1XQsWrDMBAGYBlBabcKefJmp1O8uFKbwdkSlUB2v4K9hlK4vkKeoHSsm0nZoq1Z82A9KYokH9igD37dnQixxWyRWFmFVTYJzKSUU3jrugAuf4W+72/5Vwt3ALDz+QCfPv/MWNkMCBsPwrZF+LDQIWBM8qECBR5elFJ8eFcbhBK7YkQKPsATgG+LlzK+uHaRLo9fc/8F8E1yZYu7oR/2e0JyTGDeAQ2rsASouyNZPanwaNS/itZsAgUvvNygXWr9mADX3BQ/EbLx9De2vxGKup7XSxMgO2xP49nICO1B1x6InTRft6uzEbMwprisj0ZUcQcqLhLfLdmEitXk7PbG/z/0JkoyIM7uGAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNC0xOVQwMTozNzo1MS0wNDowMGGLZNcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDQtMTlUMDE6Mzc6NTEtMDQ6MDAQ1txrAAAAAElFTkSuQmCC"
                alt="icon"
              />
              <span>Welcome</span>
            </Button>
            <Button
              onClick={() => changeTab("boreBnb")}
              active={open.boreBnb.active}
              className={`image-button ${open.boreBnb.active ? "active" : ""}`}
            >
              <img src="images/collection.png" alt="icon" />
              <span>Visibility Platform</span>
            </Button>
            <Button
              onClick={() => changeTab("terms")}
              active={open.terms.active}
              className={`image-button ${open.terms.active ? "active" : ""}`}
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAElBMVEUAAACAgIDAwMD///8AAP8AAAAnMJ9BAAAAAXRSTlMAQObYZgAAAAFiS0dEAxEMTPIAAAAHdElNRQfiBhoAKi6UAZOVAAAAtElEQVQoz52RwQ3DIAxFzSH3fKoOULVZAMoCFQOERuy/Sm0whHCsD0n8Yn99fRNJGQArnQXrvX/g7J9eyjVias9Et278/YoffoY6ID9jjPLa20ADoSvUFe923eiViOwFbGuVeKuGDwqEVIB/gL2ADeqjgQR1qsAxKCLiIxYJTmAZnZcgj94HlNCWnljSpLNmmqGpmvwVC/k8Be48lIDhEDgEDKcyDMbTiZsJ0DGDZQaEGZgKfl9+QLkGGjzRAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI2VDAwOjQyOjQ2LTA0OjAw08ZnygAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNlQwMDo0Mjo0Ni0wNDowMKKb33YAAAAASUVORK5CYII="
                alt="icon"
              />
              <span>Privacy Policy</span>
            </Button>
            {open.weth.open && (
              <Button
                onClick={() => changeTab("weth")}
                active={open.weth.active}
                className={`image-button ${open.weth.active ? "active" : ""}`}
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAElBMVEUAAACAgIDAwMD///8AAP8AAAAnMJ9BAAAAAXRSTlMAQObYZgAAAAFiS0dEAxEMTPIAAAAHdElNRQfiBhoAKi6UAZOVAAAAtElEQVQoz52RwQ3DIAxFzSH3fKoOULVZAMoCFQOERuy/Sm0whHCsD0n8Yn99fRNJGQArnQXrvX/g7J9eyjVias9Et278/YoffoY6ID9jjPLa20ADoSvUFe923eiViOwFbGuVeKuGDwqEVIB/gL2ADeqjgQR1qsAxKCLiIxYJTmAZnZcgj94HlNCWnljSpLNmmqGpmvwVC/k8Be48lIDhEDgEDKcyDMbTiZsJ0DGDZQaEGZgKfl9+QLkGGjzRAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI2VDAwOjQyOjQ2LTA0OjAw08ZnygAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNlQwMDo0Mjo0Ni0wNDowMKKb33YAAAAASUVORK5CYII="
                  alt="icon"
                />
                <span>BORE/WBNB...</span>
              </Button>
            )}

            {/* {open.paint.open && (
              <Button
                onClick={() => changeTab("paint")}
                active={open.paint.active}
                className={`image-button ${open.paint.active ? "active" : ""}`}
              >
                <img src="images/paint-16x16.png" alt="icon" />
                <span>Paint</span>
              </Button>
            )} */}
            {open.solitaire.open && (
              <Button
                onClick={() => changeTab("solitaire")}
                active={open.solitaire.active}
                className={`image-button ${
                  open.solitaire.active ? "active" : ""
                }`}
              >
                <img src="images/Solitaire_Vista_Icon.png" alt="icon" />
                <span>Solitaire</span>
              </Button>
            )}
            {open.minesweeper.open && (
              <Button
                onClick={() => changeTab("minesweeper")}
                active={open.minesweeper.active}
                className={`image-button ${
                  open.minesweeper.active ? "active" : ""
                }`}
              >
                <img src="images/minesweeper-32x32.png" alt="icon" />
                <span>Minesweeper</span>
              </Button>
            )}
          </div>
          <div className="d-flex no-responsive hide">
            <Timer />
          </div>
        </Toolbar>
      </AppBar>
      {/* {open.wallet.open && (
        <Wallet
          active={open.wallet.active}
          close={() => closeTab("wallet")}
          select={() => changeTab("wallet")}
          openRouter={(e, active) => {
            e.stopPropagation();
            changeTab("router", active);
          }}
          openWeth={(e) => {
            e.stopPropagation();
            changeTab("weth");
          }}
          openCbtc={(e) => {
            e.stopPropagation();
            changeTab("cbtc");
          }}
          openDai={(e) => {
            e.stopPropagation();
            changeTab("dai");
          }}
          isConnected={isConnected}
          connectWallet={() => setIsConnectd(true)}
          isConnecting={isLoading}
          crtAccount={crtAccount}
          chainId={chainId}
          refreshPage={() => setRefresh(!refresh)}
          refresh={refresh}
          comingSoon={false}
        />
      )} */}
      {open.router.open && (
        <Router
          active={open.router.active}
          close={() => closeTab("router")}
          select={() => changeTab("router")}
          isConnected={isConnected}
          crtAccount={crtAccount}
          chainId={chainId}
          curtActiveTab={activeRauterTab}
          refreshPage={() => setRefresh(!refresh)}
          refresh={refresh}
          comingSoon={false}
          // setPreview={(item) => setPreview(item)}
          openBoreTab={() => {
            changeTab("boreBnb");
          }}
        />
      )}
      {/* {open.paint.open && (
        <Paint
          active={open.paint.active}
          close={() => closeTab("paint")}
          select={() => changeTab("paint")}
          title="untitled - Paint"
        />
      )} */}
      {open.solitaire.open && (
        <Solitaire
          active={open.solitaire.active}
          close={() => closeTab("solitaire")}
          select={() => changeTab("solitaire")}
          title="Solitaire"
        />
      )}
      {open.btcWallet.open && (
        <ConnectWallet
          active={open.btcWallet.active}
          close={() => closeTab("btcWallet")}
          select={() => changeTab("btcWallet")}
          title="Connect Wallet"
        />
      )}
      {open.minesweeper.open && (
        <Minesweeper
          active={open.minesweeper.active}
          close={() => closeTab("minesweeper")}
          select={() => changeTab("minesweeper")}
          title="Minesweeper"
        />
      )}
      {open.ordinalMarketPlace.open && (
        <OrdinalMarketPlace
          active={open.ordinalMarketPlace.active}
          close={() => closeTab("ordinalMarketPlace")}
          select={() => changeTab("ordinalMarketPlace")}
          title="Ordinal Market place"
        />
      )}
      {open.ordinalsWallet.open && (
        <OrdinalsWallet
          active={open.ordinalsWallet.active}
          close={() => closeTab("ordinalsWallet")}
          select={() => changeTab("ordinalsWallet")}
          title="Ordinal Wallet"
        />
      )}
      {open.brc.open && (
        <Brc
          active={open.brc.active}
          close={() => closeTab("brc")}
          select={() => changeTab("brc")}
          title="Brc 20"
        />
      )}
      {open.ordinalExplore.open && (
        <OrdinalExplore
          active={open.ordinalExplore.active}
          close={() => closeTab("ordinalExplore")}
          select={() => changeTab("0rdinalExplore")}
          title="Ordinal Explore"
        />
      )}
      {open.oridinalSattribute.open && (
        <OridinalSattribute
          active={open.oridinalSattribute.active}
          close={() => closeTab("oridinalSattribute")}
          select={() => changeTab("oridinalSattribute")}
          title="Ordinals Sattributes"
        />
      )}
      {open.whitePaper.open && (
        <>
          <WhitePaper
            active={open.whitePaper.active}
            close={() => closeTab("whitePaper")}
            select={() => changeTab("whitePaper")}
          />
        </>
      )}{" "}
      {/* {open.weth.open && (
        <Info
          active={open.weth.active}
          close={() => closeTab("weth")}
          select={() => changeTab("weth")}
          title="BORE/WBNB Pancakeswap Pair Information"
        />
      )} */}
      {open.boreBnb.open && (
        <BoreBnb
          active={open.boreBnb.active}
          close={() => closeTab("boreBnb")}
          select={() => changeTab("boreBnb")}
          selectOther={(data) => changeTab(data)}
        />
      )}
      {open.infoBox.open && (
        <TextInfo
          active={open.infoBox.active}
          close={() => closeTab("infoBox")}
          select={() => changeTab("infoBox")}
          data={auth.projectInfo}
        />
      )}
      {open.terms.open && (
        <Terms
          active={open.terms.active}
          close={() => closeTab("terms")}
          select={() => changeTab("terms")}
        />
      )}
      {open.welcome.open && (
        <Welcome
          active={open.welcome.active}
          close={() => closeTab("welcome")}
          select={() => changeTab("welcome")}
        />
      )}
    </>
  );
}
