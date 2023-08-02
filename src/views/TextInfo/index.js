import React, { useState, useRef } from "react";

import { Window, WindowHeader, WindowContent, Button } from "react95";
import Draggable from "react-draggable";
import { onDragWindow } from "src/hooks/operations";

export default function TextInfo({ active, close, select, data }) {
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
  console.log(data);
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
        className="window info infotext"
        ref={windowRef}
        style={active ? { zIndex: 129 } : { zIndex: 109 }}
      >
        <WindowHeader className="window-header" active={active}>
          <span className="move" style={{ width: "100%" }} onClick={select}>
            <h3 style={{ fontSize: "20px" }}> Project Info</h3>
          </span>
          <Button onClick={() => close()}>
            <span className="close-icon" />
          </Button>
        </WindowHeader>
        <WindowContent className="window-content" onClick={select}>
          <p
            style={{
              fontSize: "17px",
              padding: "8px 5px",
              wordWrap: "break-word",
            }}
          >
            {" "}
            <strong style={{ fontSize: "" }}>Title</strong> :{" "}
            {data.addedBy == "USER" ? data.userTitle : data.title}
          </p>
          {/* <p
            style={{
              fontSize: "17px",
              wordWrap: "break-word",
              paddingBottom: "4px",
            }}
          >
            {" "}
            <strong style={{ fontSize: "" }}> Incription Number</strong> :{" "}
            {data.inscriptionNumber && data.inscriptionNumber}
          </p>{" "} */}
          {/* <br /> */}

          <div
            className="tab-content"
            style={{
              whiteSpace: "pre-line",
              fontSize: "16px",
              wordWrap: "break-word",
              padding: "5px",
            }}
            dangerouslySetInnerHTML={{ __html: data.info && data.info }}
          />
        </WindowContent>
      </Window>
    </Draggable>
  );
}
