import React, { useState, useRef } from "react";

import { Window, WindowHeader, WindowContent, Button } from "react95";
import Draggable from "react-draggable";
import { onDragWindow } from "src/hooks/operations";

export default function Terms({ active, close, select }) {
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
        className="window info infotext"
        ref={windowRef}
        style={active ? { zIndex: 129 } : { zIndex: 109 }}
      >
        <WindowHeader className="window-header" active={active}>
          <span className="move" style={{ width: "100%" }} onClick={select}>
            White Paper
          </span>
          <Button onClick={() => close()}>
            <span className="close-icon" />
          </Button>
        </WindowHeader>
        <WindowContent className="window-content" onClick={select}>
          <p>
            <strong>
              {" "}
              The Ordinal Side Phase 1: Connecting Creators, Users, and Projects
            </strong>
            <br />
            <br />
            The Ordinal Side is a dynamic platform designed to facilitate
            seamless connections between users, artists, and project creators.
            Our aim is to provide a simple and user-friendly space where
            creators can showcase their projects to a wider audience. <br />{" "}
            <br />
            Snapshot of their projects, accompanied by a direct link to their
            remarkable creations. Behind the scenes, our dedicated team works
            tirelessly to establish strategic partnerships within the Ordinal
            Side ecosystem, driving substantial traffic to the website and
            amplifying visibility for your projects. Through The Ordinal Side,
            creators have the opportunity to showcase a captivating
            <br />
            <br />
            On our platform, users hold the power to vote for their favorite
            projects, giving them the chance to trend and gain recognition. Each
            vote cast by users earns them valuable points within our ecosystem.
            While the exact implications and rewards of these points will be
            unveiled in due course, we guarantee they will contribute to an
            exciting and rewarding experience for our users.
            <br />
            <br />
            Now, let's delve into how land fits seamlessly into our thriving
            ecosystem. <br />
            <br />
            Within The Ordinal Side, land represents a tangible and valuable
            ownership stake in our ecosystem. It serves as the foundational NFT
            (non-fungible token) of our platform. As creators list their
            projects on our platform, a portion of the service fees generated
            will be distributed among our esteemed land holders. We're eagerly
            anticipating the opportunity to reveal further details and
            intricacies of this process at a later date, ensuring transparency
            and fairness throughout.
            <br />
            <br />
            Looking ahead, we have exciting plans for Phase 2, which will be
            unveiled upon the release of our platform and land mint. We
            appreciate your patience and enthusiasm as we continue to refine and
            enhance The Ordinal Side experience. Stay tuned for further updates
            and announcements.
            <br />
            <br />
            The journey doesn't end there! Phase 3 holds promising developments,
            which will be shared with our community following the successful
            launch of Phase 2. We can't wait to embark on this transformative
            phase together.
            <br />
            <br />
            #TheOrdinalSide <br />
            #ConnectingCreators <br />
            #EmpoweringProjects <br />
            #TransformingExperiences
          </p>
        </WindowContent>
      </Window>
    </Draggable>
  );
}
