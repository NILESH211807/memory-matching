import React from "react";

export default function ScorePanel({ score, level }) {
  return (
    <div className="mb-4">
      <p className="text-xl">Score: {score}</p>
      <p className="text-xl">Level: {level}</p>
    </div>
  );
}
