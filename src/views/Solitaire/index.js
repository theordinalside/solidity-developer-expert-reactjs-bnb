import React, { useState, useRef } from "react";
import { Window, WindowHeader, WindowContent, Button } from "react95";
import Draggable from "react-draggable";
import { onDragWindow } from "src/hooks/operations";

export default function Solitaire({ active, close, select, title }) {
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
        className="window solitaire"
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
        <WindowContent className="window-content no-padding">
          <iframe
            src="programs/solitaire/index.html"
            className="iframe"
            title="solitaire"
            onClick={select}
          ></iframe>
        </WindowContent>
      </Window>
    </Draggable>
  );
}
