import React, { useCallback, useEffect, useState } from 'react'
import { useGame } from '../context/GameContext';
import Loader from '../components/Loader';

const Game = () => {


    const { initializeGame, level, score, cards, flipped, matched, gridSize, setScore, setMatched, setFlipped, setDisabled, disabled, setWon, won, nextLevel, setGridSize, setLevel } = useGame();
    const [isLoading, setIsLoading] = useState(true);

    // initialize game
    useEffect(() => {
        initializeGame();
    }, [gridSize, level])

    const checkMatch = useCallback((id) => {
        const [firstid] = flipped;
        if (cards[firstid].number === cards[id].number) {
            setMatched([...matched, firstid, id]);
            setFlipped([]);
            setDisabled(false);
            setScore((prev) => prev + 10);
        } else {
            setTimeout(() => {
                setFlipped([]);
                setDisabled(false);
            }, 300);
        }
    }, [matched, cards, score, disabled, flipped]);

    const handleFlipCard = useCallback((id) => {
        if (disabled || won) return;

        if (flipped.length === 0) {
            setFlipped([id]);
            return;
        }

        if (flipped.length === 1) {
            setDisabled(true);
            if (id !== flipped[0]) {
                setFlipped([...flipped, id]);
                // check match 
                checkMatch(id);

            } else {
                setDisabled(false);
                setFlipped([]);
            }
        }
    }, [disabled, won, flipped, checkMatch]);

    useEffect(() => {
        if (matched.length === cards.length && matched.length > 0) {
            setWon(true);
            setDisabled(true);
        }
    }, [matched, cards]);

    const resetGame = () => {
        setFlipped([]);
        setMatched([]);
        setWon(false);
        setDisabled(false);
        setScore(0);
        initializeGame();
        localStorage.setItem('level', 1);
        setLevel(1);
        setGridSize(4);
    }

    const isFlipped = (id) => flipped.includes(id) || matched.includes(id);
    const isSolved = (id) => matched.includes(id);



    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, [1000]);
    }, []);


    if (isLoading) return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Loader />
        </div>
    );

    return (
        <div className="w-full min-h-screen p-5 flex items-center flex-col mb-20">
            <h1 className='text-2xl font-bold text-center capitalize mt-10 mb-8'>Memory Game</h1>
            <div className='w-full flex items-center justify-center gap-[100px]'>
                <h3 className='mb-5 font-semibold tracking-wider uppercase text-[15px] text-white px-5 py-1 rounded-md bg-[#27548A]'>Score : {score}</h3>

                <h3 className='mb-5 font-semibold tracking-wider uppercase text-[15px] text-white px-5 py-1 rounded-md bg-[#27548A]'>Level : {level}</h3>

            </div>
            <div className="grid bg-[#cfd1e0] p-3 rounded-md gap-3 relative select-none" style={{
                gridTemplateColumns: `repeat(${gridSize},minmax(0,1fr))`,
                width: `min(100%, ${gridSize * 5.5}rem)`,
            }}>
                {cards.map(card => (
                    <div onClick={() => handleFlipCard(card.id)} className={`aspect-square border border-[#b7bacc] flex items-center justify-center text-center text-xl font-bold rounded-md cursor-pointer transition-all duration-300 
                    ${isFlipped(card.id) ? isSolved(card.id) ? 'bg-[#27548A] text-white' : 'bg-[#27548A] text-white' : 'bg-[#f0f2ff]'}
                    `} key={card.id}>
                        {isFlipped(card.id) ? card.number : "?"}


                    </div>
                ))}
                {
                    won && (
                        <div className='w-full h-full rounded-md backdrop-blur-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center'>
                            <h1 className='font-semibold text-center text-md tracking-wide absolute bg-green-700 text-white px-5 py-2 rounded-full'>
                                Congratulations! You won!
                            </h1>
                        </div>
                    )
                }
            </div>

            {
                won && (
                    <div className='flex items-center gap-5 my-5'>
                        <button onClick={resetGame} className="bg-[#27548A] text-white px-6 py-3 cursor-pointer font-semibold text-sm hover:bg-[#1e4271] transition duration-300 active:scale-95">
                            Reset
                        </button>
                        <button onClick={nextLevel} className="bg-[#27548A] text-white px-6 py-3 cursor-pointer font-semibold text-sm hover:bg-[#1e4271] transition duration-300 active:scale-95">
                            Next Level
                        </button>
                    </div>
                )
            }

        </div>
    )
}

export default Game
