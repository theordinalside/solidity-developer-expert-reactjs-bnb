import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Window,
  WindowHeader,
  WindowContent,
  Tabs,
  Tab,
  TabBody,
  Fieldset,
  Button,
  TextField,
  Select,
  Hourglass,
  Panel,
} from "react95";
import Draggable from "react-draggable";
import { onDragWindow, calculateTimeLeft } from "src/hooks/operations";
import useIsMountedRef from "src/hooks/useIsMountedRef";
// import Chart from 'react-apexcharts';
import Phase2 from "./Phase2";
import Phase3 from "./Phase3";
import CollectionCard from "./CollectionCard";
import FeaturedList from "./FeaturedList";
import VettedTable from "./VettedTable";
import TxsTable from "./TxsTable";
import { TVChartContainer } from "src/component/TVChartContainer";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import moment from "moment";
import { AuthContext } from "src/context/Auth";
import { sortAddress } from "src/utils";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import Disclaimer from "../Router/Disclaimer";

export default function BoreBnb({ active, close, select, selectOther }) {
  const isMountedRef = useIsMountedRef();
  const auth = useContext(AuthContext);
  const [adData, setAdData] = useState();
  const [openDiscalmer, setopenDiscalmer] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});
  // eslint-disable-next-line
  // const [endTime, setendTime] = useState(
  //   moment(new Date()).add(23, "h").subtract(23, "m").unix()
  // );
  useEffect(() => {
    if (auth.endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(auth.endTime * 1000));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });
  const windowRef = useRef(null);
  const [state, setState] = useState({
    activeTab: 1,
  });
  const handleChange = (e, value) => setState({ activeTab: value });
  const [boundMove, setBoundMove] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  const [userToken, setUserToken] = useState("");
  const [searchToken, setSearchToken] = useState();
  const [tokenData, setTokenData] = useState();
  const [tokenDataV2, setTokenDataV2] = useState();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [symbolInfo, setSymbolInfo] = useState();

  const handleDrag = () => {
    select();
    const position = onDragWindow(windowRef.current);
    setBoundMove(position);
  };
  const { activeTab } = state;

  useEffect(() => {
    const url = window.location.href;
    const token = url.split("?token=");
    if (token[1]) {
      const finalToken =
        token[1].indexOf("&") === -1
          ? token[1].toLowerCase()
          : token[1].split("&")[0].toLowerCase();
      setSearchToken(finalToken);
    } else {
      const finalToken =
        "0x62D7aA57125169101626a993fa46685313A774Ce".toLowerCase();
      setSearchToken(finalToken);
    }
  }, []);

  useEffect(() => {
    setTokenData();
    const web = new WebSocket(ApiConfig.socket);
    try {
      setIsLoadingData(true);
      web.onopen = () => {
        // console.log("connect");
        const dataToSend = {
          tokenAddress: searchToken,
        };
        web.send(JSON.stringify(dataToSend));
        web.onmessage = async (event) => {
          // console.log("event", event);
          if (event.data !== "[object Promise]" && event.data !== "null") {
            let obj = JSON.parse(event.data);
            if (obj.responseCode === 200) {
              // console.log(obj);
              setTokenData(obj.responseResult);
              localStorage.setItem(
                "tokenPrice",
                obj.responseResult.tokenData.price
              );
            }
            setIsLoadingData(false);
          }
        };
      };
      return () => {
        web.close();
      };
    } catch (err) {
      console.log("err", err);
      setIsLoadingData(false);
    }
  }, [searchToken]);

  useEffect(() => {
    setTokenDataV2();
    const web2 = new WebSocket(ApiConfig.socket);
    try {
      setIsLoadingData(true);
      web2.onopen = () => {
        // console.log("connect");
        const dataToSend = {
          address: searchToken,
        };
        web2.send(JSON.stringify(dataToSend));
        web2.onmessage = async (event) => {
          // console.log("event", event);
          if (event.data !== "[object Promise]" && event.data !== "null") {
            let obj = JSON.parse(event.data);
            if (obj.responseCode === 200) {
              // console.log(obj);
              setTokenDataV2(obj.responseResult);
            }
            setIsLoadingData(false);
          }
        };
      };
      return () => {
        web2.close();
      };
    } catch (err) {
      console.log("err", err);
      setIsLoadingData(false);
    }
  }, [searchToken]);

  const goToToken = () => {
    window.open(`?token=${userToken}`, "_top");
    // setSearchToken(userToken);
  };
  const compareData = (v1, v2) => {
    if (v1 === 0) {
      return v2;
    } else {
      return v1;
    }
  };

  useEffect(() => {
    if (tokenData && tokenDataV2) {
      if (tokenData.pairAddress === 0) {
        setSymbolInfo(tokenDataV2.tokenData);
        localStorage.setItem("tokenV", 2);
      } else {
        setSymbolInfo(tokenData.tokenData);
        localStorage.setItem("tokenV", 1);
      }
    }
  }, [tokenData, tokenDataV2]);

  const GetTopCoinsRightAddListAPI = async () => {
    try {
      const result = await axios({
        url: ApiConfig.listTopRightAdd,
        method: "get",
      });
      if (result.data.response_code === 200) {
        setAdData(result.data.result);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    GetTopCoinsRightAddListAPI();
  }, []); //eslint-disable-line

  return (
    <>
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        bounds={boundMove}
        position={null}
        onDrag={handleDrag}
        allowAnyClick={true}
        handle=".move"
      >
        <Window
          className="window borebnb"
          ref={windowRef}
          style={active ? { zIndex: 129 } : { zIndex: 109 }}
        >
          <WindowHeader className="window-header" active={active}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {" "}
              <span>Visibility Platform</span>
              <span style={{ position: "absolute", left: "50%" }}>
                (Experimental Test)
              </span>
            </div>

            <div className="displayEnd">
              {auth?.userData?.walletAddress && (
                <div>
                  Wallet Address :{" "}
                  {auth?.userData?.walletAddress &&
                    sortAddress(auth.userData.walletAddress)}
                  <CopyToClipboard
                    text={auth.userData.walletAddress}
                    style={{
                      color: "#dbdb6e",
                      cursor: "pointer",
                      fontSize: "16px",
                      marginLeft: "6px",
                    }}
                  >
                    <FiCopy onClick={() => toast.success("Copied")} />
                  </CopyToClipboard>
                </div>
              )}
              &nbsp;&nbsp; &nbsp;&nbsp;
              <Button onClick={() => close()} className="closeButton">
                <span className="close-icon" />
              </Button>
            </div>
          </WindowHeader>
          <WindowContent className="window-content">
            <div className="graph-tab d-flex align-flex-start">
              <div className="tab-box">
                <div className="top-add-box m-b-10">
                  <div className="top-add">
                    {adData && (
                      <a href={adData[0].url} target="_blank" rel="noreferrer">
                        <img src={adData[0].image} alt="" />
                      </a>
                    )}
                  </div>
                </div>{" "}
                <div className="ShoMob">
                  <h1>
                    {" "}
                    List will refresh in{" "}
                    <span>
                      {timeLeft.h ? timeLeft.h : "00"} :{" "}
                      {timeLeft.m ? timeLeft.m : "00"}:{" "}
                      {timeLeft.s ? timeLeft.s : "00"}{" "}
                    </span>{" "}
                    Hours
                  </h1>
                </div>
                <div className="last-text-show">
                  <div className="">
                    <Tabs value={activeTab} onChange={handleChange}>
                      <Tab value={0} className="tab-button">
                        View Collection
                      </Tab>
                      <Tab value={1} className="tab-button">
                        Featured Alpha
                      </Tab>

                      <Tab value={2} className="tab-button">
                        Phase 2
                      </Tab>
                      <Tab value={4} className="tab-button">
                        Phase 3
                      </Tab>
                    </Tabs>
                  </div>

                  <h1 className="hidMob">
                    {" "}
                    List will refresh in{" "}
                    <span>
                      {timeLeft.h ? timeLeft.h : "00"} :{" "}
                      {timeLeft.m ? timeLeft.m : "00"}:{" "}
                      {timeLeft.s ? timeLeft.s : "00"}{" "}
                    </span>{" "}
                    Hours
                  </h1>
                </div>
                <TabBody className="tab-body viewTableHeightBox">
                  {activeTab === 3 && (
                    <div className="tab-content no-padding">
                      {isLoadingData ? (
                        <Hourglass size={32} />
                      ) : (
                        <div style={{ width: "72%" }}>
                          <div className="d-flex m-b-20 align-flex-start justify-flex-start">
                            <div className="name-price-box">
                              <p>
                                <strong>Token</strong>
                              </p>
                              <Panel
                                variant="well"
                                className="inside-black name-price"
                              >
                                <strong>
                                  {symbolInfo && symbolInfo.symbol}
                                </strong>
                              </Panel>
                            </div>
                            <div className="name-price-box">
                              <p>
                                <strong>Price</strong>
                              </p>
                              <Panel
                                variant="well"
                                className="inside-black name-price"
                              >
                                <strong>
                                  $
                                  {symbolInfo &&
                                    parseFloat(symbolInfo.price).toFixed(13)}
                                </strong>
                              </Panel>
                            </div>
                            <div className="name-price-box">
                              <p>
                                <strong>Market Cap</strong>
                              </p>
                              <Panel
                                variant="well"
                                className="inside-black name-price"
                              >
                                <strong>
                                  $
                                  {tokenData &&
                                    tokenDataV2 &&
                                    compareData(
                                      tokenData.MarketCap === null
                                        ? 0
                                        : tokenData.MarketCap,
                                      tokenDataV2.MarketCap
                                    )}
                                </strong>
                              </Panel>
                            </div>
                            {/* <Fieldset label="Total" className="width w-33">
                          <p>
                            Total Supply:{" "}
                            {tokenData &&
                              tokenDataV2 &&
                              compareData(
                                tokenData.totalSupply,
                                tokenDataV2.totalSupply
                              )}
                          </p>
                          <p>
                            Market Cap: $
                            {tokenData &&
                              tokenDataV2 &&
                              compareData(
                                tokenData.MarketCap === null
                                  ? 0
                                  : tokenData.MarketCap,
                                tokenDataV2.MarketCap
                              )}
                          </p>
                          <br />
                        </Fieldset>
                        <Fieldset
                          label={`${
                            symbolInfo && symbolInfo.symbol
                          }/BNB LP BNB Holdings`}
                          className="width w-33"
                        >
                          <p>
                            {tokenData &&
                              tokenDataV2 &&
                              parseInt(
                                compareData(
                                  tokenData.lpBnbHolding,
                                  tokenDataV2.lpBnbHolding
                                )
                              )}{" "}
                            BNB (
                            {tokenData &&
                              tokenDataV2 &&
                              formatCurrency.format(
                                compareData(
                                  tokenData.lpBnbHoldingPrice,
                                  tokenDataV2.lpBnbHoldingPrice
                                )
                              )}
                            )
                          </p>
                          <p>
                            V1: {tokenData && parseInt(tokenData.lpBnbHolding)}{" "}
                            BNB (
                            {tokenData &&
                              formatCurrency.format(
                                tokenData.lpBnbHoldingPrice
                              )}
                            ) |{" "}
                            {tokenData && (
                              <>
                                <Anchor
                                  href={`https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c?a=${tokenData.pairAddress}#tokenAnalytics`}
                                  target="_blank"
                                >
                                  Chart
                                </Anchor>{" "}
                                |{" "}
                                <Anchor
                                  href={`https://bscscan.com/token/${tokenData.pairAddress}#balances`}
                                  target="_blank"
                                >
                                  Holders
                                </Anchor>{" "}
                                |{" "}
                                <Anchor
                                  href={`https://v1exchange.pancakeswap.finance/#/swap?outputCurrency=${searchToken}`}
                                  target="_blank"
                                >
                                  Trade
                                </Anchor>
                              </>
                            )}
                          </p>
                          <p>
                            V2:{" "}
                            {tokenDataV2 && parseInt(tokenDataV2.lpBnbHolding)}{" "}
                            BNB (
                            {tokenDataV2 &&
                              formatCurrency.format(
                                tokenDataV2.lpBnbHoldingPrice
                              )}
                            )
                            {tokenDataV2 && tokenDataV2.pairAddress !== 0 && (
                              <>
                                |{" "}
                                <Anchor
                                  href={`https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c?a=${tokenDataV2.pairAddress}#tokenAnalytics`}
                                  target="_blank"
                                >
                                  Chart
                                </Anchor>{" "}
                                |{" "}
                                <Anchor
                                  href={`https://bscscan.com/token/${tokenDataV2.pairAddress}#balances`}
                                  target="_blank"
                                >
                                  Holders
                                </Anchor>{" "}
                                |{" "}
                                <Anchor
                                  href={`https://exchange.pancakeswap.finance/#/swap?outputCurrency=${searchToken}`}
                                  target="_blank"
                                >
                                  Trade
                                </Anchor>
                              </>
                            )}
                          </p>
                        </Fieldset>
                        <div
                          className="usfull-lins w-33"
                          style={{ width: 350 }}
                        >
                          <Fieldset label="Usefull links">
                            <Anchor
                              href={`https://bscscan.com/token/${searchToken}`}
                              target="_blank"
                            >
                              {symbolInfo && symbolInfo.symbol}
                              &nbsp; Transactions
                            </Anchor>{" "}
                            <Anchor
                              href={`https://bscscan.com/address/${searchToken}#code`}
                              target="_blank"
                            >
                              {symbolInfo && symbolInfo.symbol}
                              &nbsp;Contract
                            </Anchor>{" "}
                            <Anchor
                              href={`https://bscscan.com/token/${searchToken}#balances`}
                              target="_blank"
                            >
                              {symbolInfo && symbolInfo.symbol}
                              &nbsp;Holders
                            </Anchor>{" "}
                            <Anchor
                              href={`https://explorer.bitquery.io/bsc/token/${searchToken}`}
                              target="_blank"
                            >
                              Bitquery Explorer
                            </Anchor>
                          </Fieldset>
                        </div> */}
                          </div>
                        </div>
                      )}
                      <div className="d-flex align-flex-start">
                        <div style={{ width: "72%", height: 520 }}>
                          <div className="d-flex" style={{ height: 50 }}>
                            <div>
                              {!isLoadingData && (
                                <>
                                  <h3 style={{ fontWeight: 520 }}>
                                    {symbolInfo && symbolInfo.name} (
                                    {symbolInfo && symbolInfo.symbol}
                                    /BNB)
                                  </h3>
                                  <p>
                                    $
                                    {symbolInfo &&
                                      parseFloat(symbolInfo.price).toFixed(13)}
                                  </p>
                                </>
                              )}
                            </div>
                            <div style={{ width: "50%" }}>
                              <div style={{ display: "flex" }}>
                                <TextField
                                  value={userToken}
                                  placeholder="contract address"
                                  onChange={(e) => setUserToken(e.target.value)}
                                  fullWidth
                                />
                                <Button onClick={goToToken}>Go</Button>
                              </div>
                            </div>
                          </div>
                          <div style={{ height: "calc(100% - 30px)" }}>
                            {tokenData && tokenDataV2 && searchToken && (
                              <TVChartContainer
                                searchToken={searchToken}
                                tokenName={`${
                                  symbolInfo && symbolInfo.symbol
                                }/BNB`}
                                tokenPrice={tokenData.tokenData.price}
                              />
                            )}
                            {/* {!isLoadingGraph && (
                            // <h2>dddd</h2>
                            // <Chart
                            //   type="area"
                            //   options={chartData.options}
                            //   series={chartData.series}
                            //   type="candlestick"
                            //   height={470}
                            //   // style={{ background: "#222222" }}
                            // />
                          )} */}

                            {/* <div class="tradingview-widget-container">
                            <div id="tradingview_31bd8"></div>
                            </div> */}

                            {/* <TradingViewWidget
                            symbol="0x62d7aa57125169101626a993fa46685313a774ce-0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c-BORE-BNB"
                            autosize
                          /> */}
                          </div>
                        </div>
                        <VettedTable
                          openTeken={(token) => {
                            // setSearchToken(token)
                            window.open(`?token=${token}`, "_top");
                          }}
                        />
                      </div>
                      <div className="m-t-25 m-b-25">
                        <Fieldset label="Limit Order">
                          <div className="d-flex justify-flex-start">
                            <Select
                              defaultValue={"Buy"}
                              options={[
                                { value: "Buy", label: "Buy" },
                                { value: "Sell", label: "Sell" },
                              ]}
                              menuMaxHeight={160}
                              width={100}
                              disabled
                              className="m-r-20"
                              // onChange={(e) => console.log("change", e)}
                              // onOpen={(e) => console.log("open", e)}
                              // onClose={(e) => console.log("close", e)}
                              // onBlur={(e) => console.log("blur", e)}
                              // onFocus={(e) => console.log("focus", e)}
                            />
                            <Button disabled className="m-r-20">
                              Select Your Token
                            </Button>
                            <div className="d-flex no-responsive">
                              <TextField
                                placeholder="Amount"
                                type="number"
                                disabled
                              />
                              <Button disabled>Max</Button>
                            </div>
                            <TextField
                              type="number"
                              placeholder="Target Price"
                              disabled
                              className="m-l-20 m-r-20"
                            />
                            <TextField
                              type="number"
                              placeholder="Slippage"
                              disabled
                              className="m-r-20"
                            />
                            <Button disabled>Submit Order</Button>
                          </div>
                        </Fieldset>
                      </div>
                      {searchToken && (
                        <div className="m-t-25">
                          <TxsTable searchToken={searchToken} />
                        </div>
                      )}
                    </div>
                  )}

                  {(activeTab === 0 || activeTab === 0) && (
                    <div className="tab-content1">
                      <CollectionCard searchToken={searchToken} />
                    </div>
                  )}
                  {(activeTab === 1 || activeTab === 1) && (
                    <div className="tab-content1">
                      <FeaturedList
                        searchToken={searchToken}
                        select={(data) => selectOther(data)}
                        setendTime={(e) => auth.setendTime(e)}
                      />
                    </div>
                  )}
                  {(activeTab === 2 || activeTab === 2) && (
                    <div className="tab-content1">
                      <Phase2 />
                    </div>
                  )}
                  {(activeTab === 4 || activeTab === 4) && (
                    <div className="tab-content1">
                      <Phase3 />
                    </div>
                  )}
                </TabBody>
              </div>
              <div className="right-add-box">
                <div className="right-add">
                  {adData && (
                    <a href={adData[1].url} target="_blank" rel="noreferrer">
                      <img src={adData[1].image} alt="" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </WindowContent>
        </Window>
      </Draggable>
      {localStorage.getItem("accept") ? (
        ""
      ) : (
        <>
          {openDiscalmer && (
            <>
              <Disclaimer
                active={openDiscalmer}
                close={() => setopenDiscalmer(false)}
              />
            </>
          )}{" "}
        </>
      )}
    </>
  );
}
