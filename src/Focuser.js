import React, { useRef } from "react";

const Focuser = () => {
  const secondInput = useRef();
  const moveFocus = () => {
    secondInput.current.focus();
  };
  return (
    <div>
      <h3>Focus Starts Here</h3>
      <input type="text" autoFocus />
      <button onClick={moveFocus}>Focus the text input</button>
      <h3>Then Moves Here</h3>
      <input type="text" ref={secondInput} />
    </div>
  );
};

export default Focuser;
