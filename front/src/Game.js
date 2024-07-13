import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './css/Game.css';

function Game() {
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState(null);
    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameOver, setGameOver] = useState(false);
    const gameAreaRef = useRef(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios.get(`http://localhost:5000/categories?userId=${userId}`)
            .then(response => {
                setWords(response.data);
                startGame();
            })
            .catch(error => {
                console.error("Error fetching categories", error);
            });
    }, []);

    useEffect(() => {
        if (timeLeft > 0 && !gameOver) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentWord) {
                const wordElement = document.getElementById(currentWord.english);
                if (wordElement) {
                    const rect = wordElement.getBoundingClientRect();
                    if (rect.top >= window.innerHeight) {
                        setMisses(misses => misses + 1);
                        nextWord();
                    }
                }
            }
        }, 100);

        return () => clearInterval(interval);
    }, [currentWord]);

    const startGame = () => {
        if (words.length > 0) {
            nextWord();
            setUserInput('');
            setTimeLeft(60);
            setGameOver(false);
        }
    };

    const nextWord = () => {
        if (words.length > 0) {
            const randomIndex = Math.floor(Math.random() * words.length);
            const selectedWord = words[randomIndex];
            setCurrentWord(selectedWord);
            setUserInput('');
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setUserInput(input);
        if (currentWord && input.toLowerCase() === currentWord.english.toLowerCase()) {
            setScore(score + 1);
            nextWord();
        }
    };

    return (
        <div className="game">
            <div className="game-header">
                <h1>Acid Rain Game</h1>
                <p>Score: {score} | Misses: {misses}</p>
                <p>Time Left: {timeLeft}s</p>
            </div>
            {gameOver ? (
                <div className="game-over">
                    <h2>Game Over</h2>
                    <p>Final Score: {score}</p>
                    <button onClick={startGame}>Restart Game</button>
                </div>
            ) : (
                <div className="game-area" ref={gameAreaRef}>
                    {currentWord && (
                        <div id={currentWord.english} className="falling-word">
                            {currentWord.korean}
                        </div>
                    )}
                </div>
            )}
            <div className="input-area">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Enter the English word"
                    disabled={gameOver}
                />
            </div>
        </div>
    );
}

export default Game;
