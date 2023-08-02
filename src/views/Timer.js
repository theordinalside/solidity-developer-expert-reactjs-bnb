import React, { useEffect, useState } from "react";
import { Panel, Divider } from "react95";

const getTime = () => {
  const h = new Date().getHours();
  const m = new Date().getMinutes();
  const hour = h < 10 ? `0${h}` : h;
  const min = m < 10 ? `0${m}` : m;
  return {
    hour,
    min,
  };
};

export default function RightTimer() {
  const [currentTime, setCurrentTime] = useState(getTime());

  const timer = () => {
    setCurrentTime(getTime());
  };
  useEffect(() => {
    setInterval(timer, 5000);
  }, []);
  return (
    <>
      <Divider orientation="vertical" size="31px" style={{ borderWidth: 1 }} />
      <Panel variant="well" className="right-time">
        <div className="d-flex no-responsive">
          <img src="images/task-scheduler-16x16.png" alt="" />
          <img src="images/audio-okay-16x16.png" alt="" />
        </div>
        <p style={{ lineHeight: "15px" }}>
          {currentTime.hour}:{currentTime.min}
        </p>
      </Panel>
    </>
  );
}
