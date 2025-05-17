import React from "react";
import Card from "./Card";

export default function GameBoard({ cards, flipped, matched, onCardClick }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          isFlipped={flipped.includes(index)}
          isMatched={matched.includes(index)}
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
}
