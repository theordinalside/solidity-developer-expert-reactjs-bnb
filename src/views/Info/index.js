import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import {
  Window,
  WindowHeader,
  WindowContent,
  Divider,
  Fieldset,
  Button,
  Hourglass,
} from "react95";
import Draggable from "react-draggable";
import { onDragWindow } from "src/hooks/operations";

export default function Info({ active, close, select, title }) {
  const windowRef = useRef(null);
  const isMountedRef = useIsMountedRef();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
  useEffect(() => {
    axios({
      url: "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange",
      method: "post",
      data: {
        query: `
      query CoreWethPair{
      pair(id:"0x3211227231bb246b0401d6cdd72abf3db3a154f4"){
      token0{
      symbol
      name
      derivedETH
      }
      token1{
      name
      derivedETH
      }
      totalSupply
      reserve0
      reserve1
      trackedReserveETH
      reserveETH
      }
      }
      `,
      },
    }).then((result) => {
      console.log("data:", result.data);
      if (isMountedRef.current) {
        setIsLoading(false);
        setData(result.data.data.pair);
      }
    });
  }, []); //eslint-disable-line

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
        className="window info"
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
        <WindowContent className="window-content" onClick={select}>
          <div className="tab-content">
            {isLoading ? (
              <div style={{ margin: "30px auto", textAlign: "center" }}>
                <Hourglass size={32} />
              </div>
            ) : (
              <>
                <Fieldset label="Pair Information">
                  <p>
                    <strong>Balance BORE:</strong>{" "}
                    {parseFloat(data.reserve0).toFixed(4)}
                  </p>
                  <p>
                    <strong>Balance WBNB:</strong>{" "}
                    {parseFloat(data.reserve1).toFixed(4)}
                  </p>
                  <p>
                    <strong>BORE Price:</strong>{" "}
                    {data.token0 &&
                      parseFloat(data.token0.derivedETH).toFixed(4)}{" "}
                    BNB ( $NaN )
                  </p>
                </Fieldset>
                <div className="m-t-20">
                  <Fieldset label="LP Token Information">
                    <p>
                      <strong>Value:</strong> ( $NaN )
                    </p>
                    <p>
                      <strong>Total Supply:</strong>{" "}
                      {parseFloat(data.totalSupply).toFixed(4)} BORE/WBNB
                      Cake-LP
                    </p>
                    <p>
                      <strong>Value In LP tokens:</strong>{" "}
                      {parseFloat(data.reserveETH).toFixed(4)} BNB ( $NaN )
                    </p>
                    <div className="m-t-10 m-b-10 divider">
                      <Divider />
                    </div>
                    {/* <p>
                      At current 7% APY, 1 staked LP token generates 784 BORE
                      per unit ( $NaN** )
                    </p> */}
                  </Fieldset>
                </div>
                {/* <div className="m-t-20">
                  <p>
                    ** APY numbers are variable, and depend on BORE transfer
                    volume, Binance, and BORE prices. BORE is an experiment in
                    decentralized finance economics - absolutely no returns are
                    guaranteed.
                  </p>
                </div> */}
              </>
            )}
          </div>
        </WindowContent>
      </Window>
    </Draggable>
  );
}
