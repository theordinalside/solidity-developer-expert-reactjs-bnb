import React, { useState, useRef } from "react";

import { Window, WindowHeader, WindowContent, Button } from "react95";
import Draggable from "react-draggable";
import { onDragWindow } from "src/hooks/operations";
// import { useHistory } from "react-router-dom";
import WhitePaper from "./WhitePaper";

export default function Router({
  active,
  close,
  select,
  curtActiveTab,
  openBoreTab,
}) {
  const windowRef = useRef(null);
  // const [state, setState] = useState({
  //   activeTab: curtActiveTab,
  // });
  const [open, setOpen] = useState({
    whitePaper: { active: false, open: false },
  });
  const [boundMove, setBoundMove] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  // const history = useHistory();
  const [activeRauterTab, setActiveRauterTab] = useState(0); // eslint-disable-line

  const handleDrag = () => {
    select();
    const position = onDragWindow(windowRef.current);
    setBoundMove(position);
  };

  const closeTab = (name) => {
    const temp = { ...open };
    const crtActive = temp[name].active;
    temp[name] = { active: false, open: false };

    if (crtActive) {
      const data = Object.keys(temp).map((key) => {
        return { key, value: temp[key] };
      });
      for (let i = 0; i < data.length; i++) {
        if (data[i].value.open) {
          temp[data[i].key] = { active: true, open: true };
          break;
        }
      }
    }

    setOpen(temp);
  };
  const changeTab = (name, activeTab) => {
    if (activeTab) {
      setActiveRauterTab(activeTab);
    } else {
      setActiveRauterTab(0);
    }
    const temp = { ...open };
    Object.keys(temp).forEach((key) => {
      if (key !== name) {
        temp[key] = { ...temp[key], active: false };
      }
    });
    temp[name] = { active: true, open: true };
    console.log(" ----- temp ", temp);
    setOpen(temp);
  };
  return (
    <>
      <Draggable
        defaultPosition={{ x: 200, y: 200 }}
        bounds={boundMove}
        position={null}
        onDrag={handleDrag}
        allowAnyClick={false}
        handle=".move"
      >
        <Window
          className="window router"
          ref={windowRef}
          style={active ? { zIndex: 129 } : { zIndex: 109 }}
        >
          <WindowHeader className="window-header" active={active}>
            <span
              className="move"
              style={{ width: "100%", display: "flex", alignItems: "center" }}
              onClick={select}
            >
              <span>Welcome</span>
            </span>
            <Button onClick={() => close()}>
              <span className="close-icon" />
            </Button>
          </WindowHeader>
          <WindowContent
            className="window-content1"
            style={{ minHeight: "auto", padding: "30px 0" }}
          >
            {/* <h1 className="m-b-10">
              Lorem ipsum may be used as a placeholder before final copy is
              available.{" "}
            </h1> */}
            <div className="displayCenter welcomeTabButton" mt={2}>
              {" "}
              <Button
                // onClick={() => window.open("/images/whitepaper.docx")}
                onClick={() => changeTab("whitePaper")}
                style={{ marginRight: "10px" }}
              >
                <img
                  src="images/whitepaper.png"
                  alt="whitepaper"
                  style={{ width: "40px" }}
                />
                White Paper
              </Button>
              <Button onClick={openBoreTab}>View Collection</Button>
            </div>
          </WindowContent>
        </Window>
      </Draggable>
      {open.whitePaper.open && (
        <>
          <WhitePaper
            active={open.whitePaper.active}
            close={() => closeTab("whitePaper")}
            select={() => changeTab("whitePaper")}
          />
        </>
      )}{" "}
    </>
  );
}
