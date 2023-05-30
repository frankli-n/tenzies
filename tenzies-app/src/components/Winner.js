import React from "react"

export default function Winner(props) {
    return (
        <button className="roll-button" onClick={props.handleClick}>
            Restart
        </button>

    )}