import React from "react";

export default function Score(props) {
    return (
        <div className="score-container">
          <h1 className="score-history-text">Score History</h1>
          <ul className="score-history">
            {props.scoreHistory.map((score, index) => (
              <li className="score-item" key={index}>
                <span className="roll-number">{score}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }