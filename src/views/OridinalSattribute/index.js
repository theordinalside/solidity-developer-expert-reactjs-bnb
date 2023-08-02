import React, { useState, useRef } from "react";
import { Window, WindowHeader, Button } from "react95";
import Draggable from "react-draggable";
import { onDragWindow } from "src/hooks/operations";

export default function Minesweeper({ active, close, select, title }) {
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
        className="window minesweeper1"
        ref={windowRef}
        style={active ? { zIndex: 129 } : { zIndex: 109 }}
        id="Minesweeper"
      >
        <WindowHeader className="window-header" active={active}>
          <span className="move" style={{ width: "100%" }} onClick={select}>
            {title}
          </span>
          <Button onClick={() => close()}>
            <span className="close-icon" />
          </Button>
        </WindowHeader>
        <div
          style={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            className="desktop-icon1"
            style={{ width: "auto" }}
            onClick={() => {
              window.open(`https://www.ord.io/`, "_blank");
            }}
          >
            <img src="images/sattribute.ico" alt="" style={{ width: "32px" }} />
            <p>Ordinals Explore </p>
          </div>
        </div>
      </Window>
    </Draggable>
  );
}
