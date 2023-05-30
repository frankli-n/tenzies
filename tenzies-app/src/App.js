import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import Roll from "./components/Roll";
import Winner from "./components/Winner";
import "./App.css";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti';
import Score from "./components/Score";

function App() {
  const [diceArray, setDiceArray] = useState(makeArray());
  const [rollCount, setRollCount] = useState(0);
  const [tenzies, setTenzies] = useState(false);
  const [scoreHistory, setScoreHistory] = useState([]);

  function makeArray() {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push({
        key: nanoid(),
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
      });
    }
    return array;
  }

  function increaseRollCount() {
    setRollCount((prevRollCount) => prevRollCount + 1);
  }

  function roll() {
    increaseRollCount();
    setDiceArray((prevDiceArray) =>
      prevDiceArray.map((x) => {
        if (x.isHeld) {
          return {
            ...x,
            value: x.value,
          };
        } else {
          return {
            ...x,
            value: Math.floor(Math.random() * 2) + 1,
          };
        }
      })
    );
  }

  function holdDice(id) {
    setDiceArray((prevDiceArray) =>
      prevDiceArray.map((x) => {
        if (x.key === id.key) {
          return {
            ...x,
            isHeld: !x.isHeld,
          };
        } else {
          return x;
        }
      })
    );
  }

  function displayScore(x) {
    setScoreHistory((prevScoreHistory) => [...prevScoreHistory, x]);
  }

  function checkForWin() {
    const diceValues = diceArray.map((obj) => obj["value"]);
    const areNumsSame = diceArray.every((x) => x.value === diceArray[0].value);
    const areNumsHeld = diceArray.every((x) => x.isHeld);
    if (areNumsSame && areNumsHeld) {
      setTenzies(true);
      displayScore(rollCount);
    }
  }

  function restart() {
    setDiceArray(makeArray());
    setRollCount(0);
    setTenzies(false);
  }

  useEffect(checkForWin, [diceArray]);

  return (
    <main>
      <div>{tenzies ? <Confetti /> : ""}</div>
      <div className="dice-container">
        {diceArray.map((x) => (
          <Die
            value={x.value}
            key={x.key}
            isHeld={x.isHeld}
            handleClick={() => holdDice(x)}
          />
        ))}
      </div>
      <div>
        {tenzies ? (
          <Winner handleClick={restart} />
        ) : (
          <Roll onRoll={roll} rollNumber={rollCount} />
        )}
      </div>
      <div className="score-container">
        <Score scoreHistory={scoreHistory} />
      </div>
    </main>
  );
}

export default App;
