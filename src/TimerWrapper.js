import React, { useState, useEffect } from "react";
import Timer from "./Timer";

const TimerWrapper = () => {
  const [timerVisible, setTimerVisible] = useState(true);
  const toggleTimer = () => {
    setTimerVisible((timerVisible) => !timerVisible);
  };
  return (
    <div>
      <button onClick={toggleTimer}>Toggle Time</button>
      {timerVisible ? <Timer /> : null}
    </div>
  );
};

export default TimerWrapper;
