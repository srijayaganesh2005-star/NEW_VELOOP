import React, { useState } from "react";
import "./Game.css";

export default function Game() {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  const playGame = () => {
    const points = Math.floor(Math.random() * 10) + 1;

    setScore((prev) => prev + points);
    setMessage(`🎉 You earned ${points} points!`);
  };

  return (
    <div className="game-page">

      <div className="game-card">

        <div className="game-icon">
          🎮
        </div>

        <h1>Gem Catcher</h1>

        <p>
          Play the game and earn rewards!
        </p>

        <div className="game-score">
          <span>Score</span>
          <strong>{score}</strong>
        </div>

        <button
          className="play-button"
          onClick={playGame}
        >
          🎮 Play Game
        </button>

        {message && (
          <div className="game-message">
            {message}
          </div>
        )}

      </div>

    </div>
  );
}