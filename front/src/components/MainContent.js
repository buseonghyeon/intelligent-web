import React, { useState } from 'react';
import '../css/MainContent.css';

const MainContent = () => {
    const [gamePos, setGamePos] = useState(0);
    const [quizPos, setQuizPos] = useState(0);

    const gameSlides = [
        { image: 'https://fakeimg.pl/350x200/960a96/000?text=11111', description: 'Game Slide 1: 설명1' },
        { image: 'https://fakeimg.pl/350x200/D27328/000?text=22222', description: 'Game Slide 2: 설명2' },
        { image: 'https://fakeimg.pl/350x200/FF607F/000?text=33333', description: 'Game Slide 3: 설명3' }
    ];

    const quizSlides = [
        { image: 'https://fakeimg.pl/350x200/960a96/000?text=11111', description: 'Quiz Slide 1: 설명1' },
        { image: 'https://fakeimg.pl/350x200/D27328/000?text=22222', description: 'Quiz Slide 2: 설명2' },
        { image: 'https://fakeimg.pl/350x200/FF607F/000?text=33333', description: 'Quiz Slide 3: 설명3' }
    ];

    const totalGameSlides = gameSlides.length;
    const totalQuizSlides = quizSlides.length;

    const slideLeft = (setPos, totalSlides) => {
        setPos(prevPos => (prevPos - 1 + totalSlides) % totalSlides);
    };

    const slideRight = (setPos, totalSlides) => {
        setPos(prevPos => (prevPos + 1) % totalSlides);
    };

    return (
        <div className="main-content">
            <div className="left-side">
                <div id="slider-wrap" className="slide-container">
                    <div className="slide-controls">
                        <button className="slide-button" onClick={() => slideLeft(setGamePos, totalGameSlides)}>{'<'}</button>
                        <ul id="slider" style={{ transform: `translateX(-${gamePos * 100}%)` }}>
                            {gameSlides.map((slide, index) => (
                                <li key={index}>
                                    <img className="slide-image" src={slide.image} alt={`Game Slide ${index + 1}`} />
                                    <div className="slide-description">{slide.description}</div>
                                </li>
                            ))}
                        </ul>
                        <button className="slide-button" onClick={() => slideRight(setGamePos, totalGameSlides)}>{'>'}</button>
                    </div>
                </div>
                <button className="game-button">Mini Game</button>
            </div>
            <div className="right-side">
                <div id="slider-wrap" className="slide-container">
                    <div className="slide-controls">
                        <button className="slide-button" onClick={() => slideLeft(setQuizPos, totalQuizSlides)}>{'<'}</button>
                        <ul id="slider" style={{ transform: `translateX(-${quizPos * 100}%)` }}>
                            {quizSlides.map((slide, index) => (
                                <li key={index}>
                                    <img className="slide-image" src={slide.image} alt={`Quiz Slide ${index + 1}`} />
                                    <div className="slide-description">{slide.description}</div>
                                </li>
                            ))}
                        </ul>
                        <button className="slide-button" onClick={() => slideRight(setQuizPos, totalQuizSlides)}>{'>'}</button>
                    </div>
                </div>
                <button className="quiz-button">Quiz</button>
            </div>
        </div>
    );
};

export default MainContent;
