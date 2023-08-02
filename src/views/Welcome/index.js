import React, { useState, useRef } from "react";
import { Window, WindowHeader, WindowContent, Button } from "react95";
import Draggable from "react-draggable";
import Countdown from "react-countdown";
import { onDragWindow } from "src/hooks/operations";

export default function Info({ active, close, select }) {
  const windowRef = useRef(null);
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
            Welcome
          </span>
          <Button onClick={() => close()}>
            <span className="close-icon" />
          </Button>
        </WindowHeader>
        <WindowContent className="window-content" onClick={select}>
          <div className="tab-content" style={{ textAlign: "center" }}>
            <div className="p-20">
              <p>
                Liquidity Generation Event will start within 96 hours from
                March&nbsp;30,&nbsp;2021
                <br /> Stay Tuned!
              </p>
            </div>
            <div>
              <Countdown
                date={new Date("04/03/2021 06:30:00 UTC")}
                daysInHours={true}
                renderer={(props) => {
                  const { hours, minutes, seconds } = props.formatted;
                  return (
                    <div style={{ fontSize: 50 }}>
                      {hours} : {minutes} : {seconds}
                    </div>
                  );
                }}
              />
            </div>
          </div>
        </WindowContent>
      </Window>
    </Draggable>
  );
}
