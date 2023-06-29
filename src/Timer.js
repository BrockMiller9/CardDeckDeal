import React, { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const timerId = useRef();
  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => {
      clearInterval(timerId.current);
    };
  }, []);
  const stopTimer = () => {
    clearInterval(timerId.current);
  };
  return (
    <div>
      <h1>{seconds}</h1>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
};

export default Timer;
