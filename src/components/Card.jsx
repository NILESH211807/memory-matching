import React from "react";

export default function Card({ card, isFlipped, isMatched, onClick }) {
  return (
    <div
      className={`w-16 h-20 flex items-center justify-center text-2xl font-bold border-2 rounded cursor-pointer 
      ${isMatched ? "bg-green-400" : isFlipped ? "bg-white text-black" : "bg-blue-800"}`}
      onClick={onClick}
    >
      {isFlipped || isMatched ? card.symbol : "?"}
    </div>
  );
}
