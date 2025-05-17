import { Children, createContext, useContext, useEffect, useState } from "react";
import gameLevels from '../data/gameLevel';

// create a context game initial settings
const GameContext = createContext({
    level: 1, // initial level is 1
    gridSize: 4, // initial gridSize is 4
    score: 0, // initial score is 0
    cards: [], // initial cards is empty array
    flipped: [], // initial flipped is empty array
    matched: [], // initial matched is empty array
    disabled: false, // initial disabled is false
    won: false, // initial won is false
});


// create a provider for the context
export const GameProvider = ({ children }) => {

    const initialLevel = parseInt(localStorage.getItem('level')) || 1;
    const initialGridSize = gameLevels.find(l => l.level === initialLevel).gridSize || 4;
    const [gridSize, setGridSize] = useState(initialGridSize);
    const [level, setLevel] = useState(initialLevel);
    const [score, setScore] = useState(0);
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [won, setWon] = useState(false);

    // initialize game
    const initializeGame = () => {
        // if gridSize is 4 then totalCard 16
        const totalCard = gridSize * gridSize;
        //pairCard is half of total card 8
        const pairCard = Math.floor(totalCard / 2);

        const numbers = [...Array(pairCard).keys()].map(n => n + 1);
        const shuffledNumbers = [...numbers, ...numbers]
            .sort(() => Math.random() - 0.5)
            .slice(0, totalCard)
            .map((number, index) => ({ id: index, number }));
        setCards(shuffledNumbers);
        localStorage.setItem('level', level);
    }

    const nextLevel = () => {
        const next = level + 1;
        const nextLevelData = gameLevels.find(l => l.level === next);
        if (!nextLevelData) return;

        setLevel(next);
        setGridSize(nextLevelData.gridSize);
        setScore(0);
        setCards([]);
        setFlipped([]);
        setMatched([]);
        setDisabled(false);
        setWon(false);
        localStorage.setItem('level', next);
    }


    const values = {
        level,
        score,
        cards,
        flipped,
        matched,
        gridSize,
        setLevel,
        setScore,
        setCards,
        setFlipped,
        setMatched,
        setGridSize,
        initializeGame,
        disabled,
        setDisabled,
        won,
        setWon,
        nextLevel,
    }

    return (
        <GameContext.Provider value={values}>
            {children}
        </GameContext.Provider>
    )
}


export const useGame = () => useContext(GameContext);

export default GameContext;