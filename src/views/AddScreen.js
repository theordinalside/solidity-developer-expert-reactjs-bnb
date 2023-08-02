import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import { Window, WindowHeader, WindowContent, Hourglass } from "react95";

import ApiConfig from "src/config/APIConfig";

export default function AddScreen({ active, select, openInfoBox }) {
  const windowRef = useRef(null);
  const isMountedRef = useIsMountedRef();
  const [data, setData] = useState({ large: [], small: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(ApiConfig.listAdvertisement).then((result) => {
      if (result.data.response_code === 200) {
        if (isMountedRef.current) {
          const largeAdd = result.data.result.filter((item) => {
            return item.addType === "LARGE";
          });
          const smallAdd = result.data.result.filter((item) => {
            return item.addType === "SMALL";
          });
          setData({ large: largeAdd, small: smallAdd });
        }
      }
      setIsLoading(false);
    });
  }, []); //eslint-disable-line
  return (
    <Window
      className="window desktop-adds"
      ref={windowRef}
      style={active ? { zIndex: 129 } : { zIndex: 109 }}
    >
      <WindowHeader className="window-header" active={active}>
        {/* <span className="move" style={{ width: "100%" }}>
          IF REWARDS ARE OFFERED USERS MUST HOLD ANY AMOUNT OF BORE TOKENS TO
          RECEIVE THEM
        </span> */}
      </WindowHeader>
      <WindowContent className="window-content">
        <div className="tab-content">
          {isLoading ? (
            <div style={{ margin: "30px auto", textAlign: "center" }}>
              <Hourglass size={32} />
            </div>
          ) : (
            <div className="static-info">
              <div className="ads d-flex justify-flex-start align-flex-start">
                {data.large.map((item, index) => {
                  return (
                    <div className="info-box" key={`large-add${index}`}>
                      <div
                        className="image"
                        // style={{
                        //   backgroundImage: `url(${item.image})`,
                        // }}
                        onClick={() => openInfoBox(item)}
                      >
                        <img src={item.image} alt="Ad" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="ads d-flex justify-flex-start align-flex-start">
                {data.small.map((item, index) => {
                  return (
                    <div className="info-box small" key={`small${index}`}>
                      <div
                        className="image"
                        // style={{
                        //   backgroundImage: `url(${item.image})`,
                        // }}
                        onClick={() => openInfoBox(item)}
                      >
                        <img src={item.image} alt="Ad" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </WindowContent>
    </Window>
  );
}
