import React, { useState, useEffect } from "react";
import axios from "axios";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import { Anchor } from "react95";
import ApiConfig from "src/config/APIConfig";

export default function Contact({ openInfoBox }) {
  const isMountedRef = useIsMountedRef();
  const [data, setData] = useState();

  useEffect(() => {
    axios.get(ApiConfig.contactUsList).then((result) => {
      if (result.data.response_code === 200) {
        if (isMountedRef.current) {
          // console.log("New data==>", result.data.result);
          setData(result.data.result);
        }
      }
      // setIsLoading(false);
    });
  }, []); //eslint-disable-line
  // console.log("data==>", data);
  return (
    <div className="bottom-right-info">
      <div
        className="desktop-icon"
        style={{ width: 200, position: "static", margin: "0 auto" }}
        onClick={() => {
          window.open(
            `https://telegram.me/collablandbot?start=VFBDI1RFTCNDT01NIy0xMDAxNDEwNzUzNjc5`,
            "_blank"
          );
        }}
      >
        <img src="images/telegram-32x32.png" alt="" />
        Telegram for BORE holders
      </div>
      <div className="m-t-10 conatct">
        For marketing enquires please email:{" "}
        <Anchor href="mailto:bnb@bnbama.finance">bnb@bnbama.finance</Anchor>
      </div>
      <div className="m-t-5 conatct">
        <Anchor onClick={() => openInfoBox(data[0])}>
          {data && data[0].title}
        </Anchor>
        &nbsp; &nbsp;
        <Anchor onClick={() => openInfoBox(() => openInfoBox(data[1]))}>
          {data && data[1].title}
        </Anchor>
      </div>
    </div>
  );
}
