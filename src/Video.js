import React, { useState, useRef, useEffect } from "react";

function Video({ src = "https://www.w3schools.com/html/mov_bbb.mp4" }) {
  const [speed, setSpeed] = useState(1);
  const videoRef = useRef();
  useEffect(() => {
    videoRef.current.playbackRate = speed;
  }, [speed]);
  return (
    <div>
      <video muted autoPlay loop ref={videoRef}>
        <source src={src} />
      </video>
      <div>
        <button onClick={() => setSpeed(speed / 2)}>Slow</button>
        <button onClick={() => setSpeed(speed * 2)}>Fast</button>
        <p>Current speed: {speed}</p>
      </div>
    </div>
  );
}

export default Video;
