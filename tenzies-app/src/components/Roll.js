import React from "react";

export default function Roll(props) {
  return (
    <button className="roll-button" onClick={props.onRoll}>
      Roll {props.rollNumber}
    </button>
  );
}
