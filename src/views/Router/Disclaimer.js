import React, { useState, useRef } from "react";
import { Window, WindowHeader, WindowContent, Button } from "react95";
import Draggable from "react-draggable";
import { onDragWindow } from "src/hooks/operations";
export default function Disclaimer({ active, close }) {
  const windowRef = useRef(null);
  const [boundMove, setBoundMove] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  const handleDrag = () => {
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
        <WindowHeader className="window-header" active={active} style={{}}>
          <span className="move" style={{ width: "100%" }}>
            Disclaimer
          </span>
          <Button onClick={() => close()}>
            <span className="close-icon" />
          </Button>
        </WindowHeader>
        <WindowContent className="window-content">
          <p>
            {/* <strong>Introduction:</strong> */}
            <br />
            The information on The Ordinal Side is user-generated and not
            verified. Ordinal Side does not provide financial advice or
            facilitate transactions.
            <br /> <br />
            Also note that the Content listed on this website could potentially
            be scams, i.e. designed to induce you to invest financial resources
            that may be lost forever and not be recoverable once investments are
            made. You are responsible for conducting your own research (DYOR)
            before making any investments.
            <br />
            <br />
          </p>

          <div className="displayCenter" style={{ marginBottom: "20px" }}>
            <Button
              style={{ marginRight: "10px", minWidth: "127px" }}
              onClick={() => {
                window.localStorage.setItem("accept", "accepted");
                close();
              }}
            >
              Okay, I understand
            </Button>
            <Button
              style={{ minWidth: "127px" }}
              onClick={() => {
                window.open(
                  `https://unisat.io/market?tick=dyor&tab=1`,
                  "_blank"
                );
              }}
            >
              Always DYOR
            </Button>
          </div>
        </WindowContent>
      </Window>
    </Draggable>
  );
}
