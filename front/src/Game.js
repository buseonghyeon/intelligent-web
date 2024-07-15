import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './css/Game.css';
import Navbar from "./components/Navbar";


const Game = () => {
    const [words, setWords] = useState([]);
    const [fallingWords, setFallingWords] = useState([]);
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [speed, setSpeed] = useState(0.5); // 속도 초기값을 작게 설정
    const [isGameStarted, setIsGameStarted] = useState(false);
    const gameContainerRef = useRef(null);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await axios.get('http://localhost:5000/words');
                setWords(response.data);
            } catch (error) {
                console.error('Error fetching words:', error);
            }
        };

        fetchWords();
    }, []);

    useEffect(() => {
        if (isGameStarted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
                setSpeed(speed + 0.05); // 속도 증가를 더 천천히 설정
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            alert(`Time's up! Your score is ${score}`);
            setIsGameStarted(false);
        }
    }, [timeLeft, speed, isGameStarted, score]);

    useEffect(() => {
        if (isGameStarted) {
            const gameInterval = setInterval(() => {
                if (timeLeft > 0 && words.length > 0) {
                    let word;
                    let left;
                    let overlapping;

                    do {
                        word = words[Math.floor(Math.random() * words.length)];
                        left = Math.random() * 80; // 랜덤으로 위치 설정
                        overlapping = fallingWords.some(fallingWord =>
                            Math.abs(fallingWord.left - left) < 10
                        );
                    } while (overlapping);

                    setFallingWords((prevWords) => [...prevWords, { text: word, top: 0, left }]);
                }
            }, 1000); // 단어 생성 주기를 더 길게 설정

            return () => clearInterval(gameInterval);
        }
    }, [words, timeLeft, isGameStarted, fallingWords]);

    useEffect(() => {
        if (isGameStarted) {
            const moveWords = setInterval(() => {
                setFallingWords((prevWords) =>
                    prevWords.map((word) => ({ ...word, top: word.top + speed }))
                );
            }, 100);

            return () => clearInterval(moveWords);
        }
    }, [speed, isGameStarted]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        const matchedWordIndex = fallingWords.findIndex((word) => word.text === e.target.value);
        if (matchedWordIndex !== -1) {
            setScore(score + 1);
            setFallingWords(fallingWords.filter((_, index) => index !== matchedWordIndex));
            setInput('');
        }
    };

    const startGame = () => {
        setIsGameStarted(true);
        setTimeLeft(60);
        setSpeed(0.5);
        setScore(0);
        setFallingWords([]);
        const initialWord = words[Math.floor(Math.random() * words.length)];
        const initialLeft = Math.random() * 80; // 랜덤으로 위치 설정
        setFallingWords([{ text: initialWord, top: 0, left: initialLeft }]);
    };

    return (

        <div className="game-container" ref={gameContainerRef}>
            <Navbar />
            <div className="game-content">
                <div className="score-timer-container">
                    <div className="score">Score: {score}</div>
                    <div className="timer">Time Left: {timeLeft}s</div>
                </div>
                <div className="game-area">
                    {fallingWords.map((word, index) => (
                        <div
                            key={index}
                            className="falling-word"
                            style={{ top: `${word.top}px`, left: `${word.left}%` }}
                        >
                            {word.text}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    className="input-box"
                    placeholder="Type the falling words..."
                />
                {!isGameStarted && (
                    <button className="start-button" onClick={startGame}>Start Game</button>
                )}
            </div>
        </div>
    );
};

export default Game;
