import React, { useState, useEffect } from "react";

function Counter() {
  const [number, setNumber] = useState(0);

  const increment = () => {
    setNumber((number) => number + 1);
  };

  useEffect(() => {
    document.title = `Hi ${"!".repeat(number)}`;
  });

  return (
    <div>
      Lets get excited about React Hooks!
      <button onClick={increment}> Get excited </button>
      <p>Counter: {number}</p>
    </div>
  );
}

export default Counter;
