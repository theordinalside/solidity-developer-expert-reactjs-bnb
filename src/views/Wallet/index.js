import React, { useState, useRef, useEffect } from "react";
import { ethers } from "ethers";
import coreAbi from "src/hooks/abis/coreAbi";
import pairAbi from "src/hooks/abis/pair";
import Countdown from "react-countdown";
import {
  coreAdd,
  corePair,
  workingNetwork,
  LgeEndDate,
} from "src/hooks/address";
import {
  Window,
  WindowHeader,
  WindowContent,
  Tabs,
  Tab,
  TabBody,
  Fieldset,
  Button,
  Avatar,
  Hourglass,
  TextField,
  Checkbox,
} from "react95";
import Draggable from "react-draggable";
import {
  onDragWindow,
  sortAddress,
  checkMetaMask,
  getCoreData,
  approveLP,
  stakeLP,
  createLGE,
  claimLPToken,
} from "src/hooks/operations";
export default function Wallet({
  active,
  close,
  select,
  openRouter,
  openWeth,
  isConnected,
  connectWallet,
  isConnecting,
  crtAccount,
  chainId,
  refreshPage,
  refresh,
  comingSoon,
}) {
  const windowRef = useRef(null);
  const [state, setState] = useState({
    activeTab: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [boundMove, setBoundMove] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  const [walletAdd, setWalletAdd] = useState("");
  const [coreData, setCoreData] = useState();
  const [lge, setLge] = useState("");
  const [maxToLge, setMaxToLge] = useState(0);
  const [conditionMsg, setConditionMsg] = useState("");
  const [conditionCheck, setConditionCheck] = useState(true);
  const [isLging, setIsLging] = useState(false);
  const [claimingLP, setClaimingLP] = useState(false);
  const handleChange = (e, value) => setState({ activeTab: value });
  const isMetaMask = checkMetaMask();
  const { activeTab } = state;

  const handleDrag = () => {
    select();
    const position = onDragWindow(windowRef.current);
    setBoundMove(position);
  };

  const getData = async () => {
    const account = window.sessionStorage.getItem("account");
    if (
      isMetaMask &&
      isConnected &&
      account !== null &&
      chainId === workingNetwork
    ) {
      setIsLoading(true);
      const add = sortAddress(account);
      setWalletAdd(add);
      const core = await getCoreData(coreAdd, coreAbi, "core");
      const pair = await getCoreData(corePair, pairAbi, "corePair");
      setCoreData({ core, pair });
      setLge(core.providerBalance);
      setMaxToLge(core.providerBalance);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [crtAccount, isConnected, isMetaMask, chainId, refresh]); //eslint-disable-line
  // console.log({ isConnected, crtAccount });
  const onApproveLP = async () => {
    setIsApproving(true);
    try {
      await approveLP();
      setIsApproving(false);
      refreshPage();
    } catch (error) {
      setIsApproving(false);
    }
  };

  const onClaim = async () => {
    setIsClaiming(true);
    try {
      await stakeLP("0");
      setIsClaiming(false);
      refreshPage();
    } catch (error) {
      setIsClaiming(false);
    }
  };
  const onLge = async () => {
    setIsLging(true);
    try {
      const res = await createLGE(conditionMsg, lge);
      if (res.type === "condition") {
        setConditionMsg(res.msg);
      } else if (res.type === "lge") {
        refreshPage();
      }
      setIsLging(false);
    } catch (error) {
      setIsLging(false);
    }
  };

  const claimLP = async () => {
    setClaimingLP(true);
    try {
      await claimLPToken();
      // console.log(res);
      setClaimingLP(false);
      refreshPage();
    } catch (error) {
      setClaimingLP(false);
    }
  };

  const sumTotal = (a, b) => {
    const x = ethers.utils.parseEther(a);
    const y = ethers.utils.parseEther(b);
    const total = x.add(y);
    return ethers.utils.formatEther(total);
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
        style={active ? { zIndex: 129 } : { zIndex: 109 }}
      >
        <WindowHeader className="window-header" active={active}>
          <span className="move" style={{ width: "100%" }} onClick={select}>
            Wallet.bnb
          </span>
          <Button onClick={() => close()}>
            <span className="close-icon" />
          </Button>
        </WindowHeader>
        <WindowContent className="window-content" onClick={select}>
          {isConnecting ? (
            <Hourglass size={32} />
          ) : (
            <>
              {isConnected && chainId !== workingNetwork && isMetaMask && (
                <div style={{ textAlign: "center", paddingTop: 30 }}>
                  <p>Please change your network to Binance smart chain</p>
                </div>
              )}
              {!isMetaMask && (
                <div style={{ textAlign: "center" }}>
                  <img
                    src="images/metamask-fox.svg"
                    width="50"
                    alt=""
                    className="m-r-10"
                  />
                  <p>Please Install MetaMask</p>
                </div>
              )}
              {!isConnected && isMetaMask && (
                <div style={{ textAlign: "center" }}>
                  <img
                    src="images/metamask-fox.svg"
                    width="50"
                    alt=""
                    className="m-r-10"
                  />
                  <p>Please Connect to Wallet</p>
                </div>
              )}
              {isConnected && chainId === workingNetwork && (
                <>
                  <div className="m-b-10">
                    <div className="d-flex no-responsive">
                      <div
                        className="m-b-5"
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          size={30}
                          src={
                            "https://sphoto.nasza-klasa.pl/33278012/1/square/2658174fbd.jpeg?v=1"
                          }
                          className="m-r-10"
                        />

                        <p>{walletAdd}</p>
                      </div>
                      <p>{maxToLge} BNB</p>
                    </div>
                    <h1>Personal BORE Vault v1.0</h1>
                  </div>

                  <Tabs value={activeTab} onChange={handleChange}>
                    <Tab value={0} className="tab-button">
                      LGE
                    </Tab>
                    <Tab value={1} className="tab-button">
                      Summary
                    </Tab>
                    <Tab value={2} className="tab-button">
                      Farm
                    </Tab>
                  </Tabs>
                  <TabBody className="tab-body">
                    {activeTab === 0 && (
                      <div className="tab-content">
                        {isLoading ? (
                          <div
                            style={{ margin: "30px auto", textAlign: "center" }}
                          >
                            <Hourglass size={32} />
                          </div>
                        ) : (
                          <>
                            {!isConnected || chainId !== workingNetwork ? (
                              <p>Wallet not connected</p>
                            ) : (
                              <>
                                <div className="m-b-20">
                                  <p
                                    style={{
                                      fontSize: 30,
                                      textAlign: "center",
                                    }}
                                  >
                                    Liquidity Generation Event will end in{" "}
                                    <Countdown
                                      date={new Date(LgeEndDate)}
                                      renderer={(props) => {
                                        const {
                                          days,
                                          hours,
                                          minutes,
                                          seconds,
                                        } = props.formatted;
                                        return (
                                          <span>
                                            {days}&nbsp;:&nbsp;{hours}
                                            &nbsp;:&nbsp;{minutes}&nbsp;:&nbsp;
                                            {seconds}
                                          </span>
                                        );
                                      }}
                                    ></Countdown>
                                  </p>
                                </div>
                                <div className="m-b-20">
                                  <p
                                    style={{
                                      fontSize: 20,
                                      textAlign: "center",
                                    }}
                                  >
                                    Total Raised{" "}
                                    {coreData &&
                                      parseFloat(
                                        coreData.core.totalEthContributed
                                      ).toFixed(4)}{" "}
                                    BNB
                                  </p>
                                </div>
                                <Fieldset label="Liquidity" className="m-b-20">
                                  <div className="d-flex">
                                    <div className="m-b-10">
                                      <p>
                                        Deposited{" "}
                                        {coreData &&
                                          coreData.core.ethContributed}{" "}
                                        BNB
                                      </p>
                                    </div>
                                    <div>
                                      <Button
                                        style={{ width: 90 }}
                                        onClick={claimLP}
                                        disabled={
                                          comingSoon ||
                                          coreData.core.ethContributed <= 0 ||
                                          claimingLP
                                        }
                                      >
                                        {claimingLP ? "Pending..." : "Claim LP"}
                                      </Button>
                                    </div>
                                  </div>
                                </Fieldset>
                                {comingSoon && (
                                  <Fieldset label="Add Liquidity">
                                    <div className="d-flex no-responsive m-b-20">
                                      <div
                                        style={{ display: "flex", flexGrow: 1 }}
                                      >
                                        <TextField
                                          placeholder="0.0000"
                                          onChange={(e) =>
                                            setLge(e.target.value)
                                          }
                                          value={lge}
                                          fullWidth
                                          type="number"
                                        />
                                        <Button
                                          onClick={() => setLge(maxToLge)}
                                        >
                                          MAX
                                        </Button>
                                      </div>
                                      <div className="logo-box m-l-15 m-r-15">
                                        <img
                                          src="images/binance-coin-bnb-logo.svg"
                                          alt=""
                                          width="24"
                                        />
                                      </div>

                                      <h2>BNB</h2>
                                    </div>
                                    {conditionMsg !== "" && (
                                      <div className="m-b-20">
                                        <p>{conditionMsg}</p>
                                        <Checkbox
                                          checked={conditionCheck}
                                          onChange={() =>
                                            setConditionCheck(!conditionCheck)
                                          }
                                          label="I understand"
                                        />
                                      </div>
                                    )}
                                    <Button
                                      fullWidth
                                      disabled={
                                        comingSoon ||
                                        lge <= 0 ||
                                        lge > maxToLge ||
                                        isLging ||
                                        !conditionCheck
                                      }
                                      onClick={onLge}
                                    >
                                      {isLging ? "Pending..." : "Add"}
                                    </Button>
                                  </Fieldset>
                                )}
                                <div className="m-t-20">
                                  <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAFVBMVEUAAACAgAD//wDAwMAAAACAgID////uPuK0AAAAAXRSTlMAQObYZgAAAAFiS0dEBmFmuH0AAAAHdElNRQfiBhoAKi/jBqMDAAAApUlEQVQoz12PwRHDIAwE4ZECwriBCCrIUEDiyH9/6L+VcMIgyfdjZ27FhSCJz+CT8se9I1E9b6A01yDKx+kBWdAbXdJuwErQcJJEld9G0hvMu5FcQCVpAJVcYElwVMCUAGwAU4Jf4OySABSmNUf+/frqHAH5p3NkCO06Z4ARAGlQxpUhGaDwPiXJAkiSrdACy9o8yB1EC2rr1o01B0BoNvjqw4LwB7hqPlTe+r15AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI2VDAwOjQyOjQ3LTA0OjAwdbFsfgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNlQwMDo0Mjo0Ny0wNDowMATs1MIAAAAASUVORK5CYII="
                                    alt=""
                                    style={{
                                      width: 30,
                                      margin: "0 auto",
                                      display: "block",
                                      marginBottom: 10,
                                    }}
                                  />
                                  <p>
                                    All BORE liquidity provider tokens are
                                    locked. Itd is impossible to liquidate these
                                    LP tokens in to their underlying assets.
                                    However, LP tokens do allow you to
                                    participate in the LP farming pool in our
                                    BOREVault smart contract, in exchange for
                                    your service provide to traders as a
                                    liquidity provider.
                                  </p>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                    {activeTab === 1 && (
                      <div className="tab-content">
                        {comingSoon ? (
                          <p className="coming p-t-30 p-b-30">
                            We are coming soon
                          </p>
                        ) : (
                          <>
                            {isLoading ? (
                              <div
                                style={{
                                  margin: "30px auto",
                                  textAlign: "center",
                                }}
                              >
                                <Hourglass size={32} />
                              </div>
                            ) : (
                              <>
                                <Fieldset label="BORE">
                                  <div className="d-flex">
                                    <div className="m-b-10">
                                      <p>
                                        Total{" "}
                                        {coreData &&
                                          sumTotal(
                                            coreData.core.wallet,
                                            coreData.core.totalClaimable
                                          )}
                                      </p>
                                      <p>
                                        Wallet{" "}
                                        {coreData && coreData.core.wallet}
                                      </p>
                                      <p>
                                        Total Claimable{" "}
                                        {coreData &&
                                          coreData.core.totalClaimable}
                                      </p>
                                    </div>
                                    <div>
                                      <Button
                                        style={{ width: 90 }}
                                        onClick={() => {
                                          window.open(
                                            `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${coreAdd}`,
                                            "_blank"
                                          );
                                        }}
                                      >
                                        {coreData && coreData.core.wallet > 0
                                          ? "Get More"
                                          : "Get"}
                                      </Button>
                                      {coreData &&
                                        coreData.core.totalClaimable > 0 && (
                                          <Button
                                            style={{
                                              width: 90,
                                              display: "block",
                                            }}
                                            className="m-t-5"
                                            onClick={onClaim}
                                            disabled={isClaiming}
                                          >
                                            {isClaiming
                                              ? "Pending..."
                                              : "Claim"}
                                          </Button>
                                        )}
                                    </div>
                                  </div>
                                </Fieldset>
                                <div className="m-t-15">
                                  <Fieldset label="BORE/WBNBLP">
                                    <div className="d-flex">
                                      <div className="m-b-10">
                                        <p>
                                          Total{" "}
                                          {coreData &&
                                            sumTotal(
                                              coreData.pair.wallet,
                                              coreData.pair.totalStake
                                            )}
                                        </p>
                                        <p>
                                          Wallet{" "}
                                          {coreData && coreData.pair.wallet}
                                        </p>
                                        <p>
                                          Staked{" "}
                                          {coreData && coreData.pair.totalStake}
                                        </p>
                                      </div>
                                      <div>
                                        {coreData &&
                                          coreData.pair.wallet <= 0 && (
                                            <Button
                                              style={{
                                                width: 90,
                                                display: "block",
                                              }}
                                              onClick={() => {
                                                window.open(
                                                  `https://exchange.pancakeswap.finance/#/add/ETH/${coreAdd}`,
                                                  "_blank"
                                                );
                                              }}
                                            >
                                              Get
                                            </Button>
                                          )}
                                        {coreData &&
                                          coreData.pair.wallet > 0 &&
                                          coreData.pair.allowance >=
                                            coreData.pair.wallet && (
                                            <Button
                                              style={{
                                                width: 90,
                                                display: "block",
                                              }}
                                              className="m-t-5"
                                              onClick={openRouter}
                                            >
                                              Stake
                                            </Button>
                                          )}
                                        {coreData &&
                                          coreData.pair.wallet > 0 &&
                                          coreData.pair.allowance <
                                            coreData.pair.wallet && (
                                            <Button
                                              style={{
                                                width: 90,
                                                display: "block",
                                              }}
                                              className="m-t-5"
                                              onClick={onApproveLP}
                                              disabled={isApproving}
                                            >
                                              {isApproving
                                                ? "Pending..."
                                                : "Approve"}
                                            </Button>
                                          )}
                                      </div>
                                    </div>
                                  </Fieldset>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                    {activeTab === 2 && (
                      <div className="tab-content">
                        {comingSoon ? (
                          <p className="coming p-t-30 p-b-30">
                            We are coming soon
                          </p>
                        ) : (
                          <>
                            <Fieldset label="BORE/WBNB LP">
                              <div className="d-flex">
                                <div>
                                  <p>
                                    Staked:{" "}
                                    {coreData && coreData.pair.totalStake} LP
                                  </p>
                                  {/* <p>APY 7%*</p> */}
                                  <p>
                                    Claimable:{" "}
                                    {coreData && coreData.core.totalClaimable}
                                  </p>
                                  {/* <Anchor
                                    className="link-text"
                                    onClick={openWeth}
                                  >
                                    {" "}
                                    More Info...
                                  </Anchor> */}
                                </div>
                                <div>
                                  <Button
                                    style={{
                                      width: 90,
                                      display: "block",
                                    }}
                                    className="m-t-5"
                                    disabled={
                                      coreData && coreData.pair.totalStake <= 0
                                    }
                                    onClick={(e) => openRouter(e, 1)}
                                  >
                                    Unstake
                                  </Button>
                                  <Button
                                    style={{
                                      width: 90,
                                      display: "block",
                                    }}
                                    className="m-t-5"
                                    onClick={onClaim}
                                    disabled={
                                      (coreData &&
                                        coreData.core.totalClaimable <= 0) ||
                                      isClaiming
                                    }
                                  >
                                    {isClaiming ? "Pending..." : "Claim"}
                                  </Button>
                                </div>
                              </div>
                            </Fieldset>
                            {/* <div className="m-t-20">
                              <p>
                                **APY calculation is calculated as an average of
                                fees over the last 89.42 days, current TVL and
                                BORE price. All future pools will be carefully
                                picked to maximise opportunities for the BORE
                                community.
                              </p>
                            </div> */}
                          </>
                        )}
                      </div>
                    )}
                  </TabBody>
                </>
              )}
            </>
          )}
        </WindowContent>
      </Window>
    </Draggable>
  );
}
