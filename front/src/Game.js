import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Game.css';
import Navbar from "./components/Navbar";

const generateRandomWord = (words) => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].english; // 영어 단어를 사용
};

const generateRandomPosition = () => {
    return Math.random() * 90; // 0% to 90% from the left
};

const Game = () => {
    const [words, setWords] = useState([]);
    const [fallingWords, setFallingWords] = useState([]);
    const [typedWord, setTypedWord] = useState("");
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); // 1분 타이머
    const [gameOver, setGameOver] = useState(false); // 게임 종료 상태

    // 단어를 데이터베이스에서 가져오는 함수
    const fetchWords = async () => {
        try {
            const userId = localStorage.getItem('userId'); // user_id를 로컬스토리지에서 가져옴
            const response = await axios.get(`http://localhost:5000/game-words?user_id=${userId}`);
            setWords(response.data);
        } catch (error) {
            console.error('Error fetching words:', error);
        }
    };

    // 게임을 시작할 때 단어를 가져오는 함수
    const startGame = async () => {
        await fetchWords(); // 게임 시작 시 단어를 가져옴
        setIsGameStarted(true);
        setGameOver(false);
        setFallingWords([]);
        setTypedWord("");
        setScore(0);
        setMessage("");
        setTimeLeft(60); // 타이머 초기화
    };

    // 타이머 설정
    useEffect(() => {
        if (isGameStarted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setIsGameStarted(false);
            setGameOver(true);
            setMessage("시간 종료! ⏰");
        }
    }, [isGameStarted, timeLeft]);

    // 단어 생성 및 이동을 처리하는 useEffect
    useEffect(() => {
        let wordGenerationInterval;
        let fallingInterval;

        if (isGameStarted) {
            wordGenerationInterval = setInterval(() => {
                setFallingWords(fallingWords => {
                    if (words.length > 0) {
                        const newWords = [];
                        const wordCount = Math.floor(Math.random() * 3) + 1; // 1에서 3개의 단어 생성
                        for (let i = 0; i < wordCount; i++) {
                            const newWord = {
                                word: words[Math.floor(Math.random() * words.length)].english, // 영어 단어를 사용
                                position: 0,
                                speed: Math.random() * 0.5 + 1.0, // 더 느린 속도 (1.0에서 1.5 사이)
                                left: generateRandomPosition()
                            };
                            newWords.push(newWord);
                        }
                        return [...fallingWords, ...newWords];
                    }
                    return fallingWords;
                });
            }, 4000); // 단어 생성 주기 (4초마다 생성)

            fallingInterval = setInterval(() => {
                setFallingWords(fallingWords =>
                    fallingWords
                        .map(fw => ({ ...fw, position: fw.position + fw.speed })) // 단어 위치 업데이트
                        .filter(fw => fw.position <= window.innerHeight - 100) // 화면 바깥으로 나간 단어 제거
                );
            }, 50);
        }

        return () => {
            clearInterval(wordGenerationInterval);
            clearInterval(fallingInterval);
        };
    }, [isGameStarted, words]);

    const handleChange = (e) => {
        setTypedWord(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === " ") {
            const trimmedTypedWord = typedWord.trim();
            const matchedWordIndex = fallingWords.findIndex(fw => fw.word === trimmedTypedWord);
            if (matchedWordIndex !== -1) {
                setScore(score + 1);
                setMessage("성공! 🎉😊");
                setFallingWords(fallingWords.filter((_, index) => index !== matchedWordIndex));
                setTypedWord("");
                setTimeout(() => setMessage(""), 1000);
            } else if (trimmedTypedWord.length > 0) {
                setMessage("실패! 😢");
                setTypedWord("");
                setTimeout(() => setMessage(""), 1000);
            }
        }
    };

    useEffect(() => {
        document.body.classList.add('game-page');
        return () => {
            document.body.classList.remove('game-page');
        };
    }, []);

    return (
        <>
            <Navbar />  {/* Navbar 추가 */}
            <div className="mini-game">
                <h1>미니 게임</h1>
                <h2>Score: {score}</h2>
                <h2>Time Left: {timeLeft}s</h2>
                <div className="game-container">
                    {fallingWords.map((fw, index) => (
                        <div
                            key={index}
                            className="falling-word-container"
                            style={{ top: fw.position + 'px', left: fw.left + '%' }}
                        >
                            <div className="falling-word">
                                {fw.word}
                            </div>
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={typedWord}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="단어를 입력하세요"
                />
                <p>{message}</p>
                {!isGameStarted && !gameOver && (
                    <div className="modal">
                        <div className="modal-content">
                            <button onClick={startGame}>Start Game</button>
                        </div>
                    </div>
                )}
                {gameOver && (
                    <div className="modal">
                        <div className="modal-content">
                            <p>시간 초과! 점수: {score}</p>
                            <button onClick={startGame}>Restart Game</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Game;
