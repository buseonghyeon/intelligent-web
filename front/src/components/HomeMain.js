import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import QuizModal from './QuizModal';
import axios from 'axios';
import '../css/HomeMain.css';

const HomeMain = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [dayData, setDayData] = useState([]);
    const [quizData, setQuizData] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState({});
    const itemsPerPage = 5;

    useEffect(() => {
        const savedScore = JSON.parse(localStorage.getItem('score'));
        if (savedScore) {
            setScore(savedScore);
        }
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedDay('');
        setCurrentPage(1);
        setDayData([]);
        setAnswers({});
    };

    const handleDayClick = async (day) => {
        setSelectedDay(day);
        try {
            const response = await axios.get(`http://localhost:5000/${selectedCategory}/${day}`);
            setDayData(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching day data:", error);
        }
    };

    const handleQuizClick = async (day) => {
        setSelectedDay(day);
        try {
            const response = await axios.get(`http://localhost:5000/${selectedCategory}/${day}`);
            setQuizData(response.data);
            setIsQuizModalOpen(true);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseQuizModal = () => {
        setIsQuizModalOpen(false);
        setQuizData([]);
        setAnswers({});
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleAnswerChange = (id, value) => {
        setAnswers({
            ...answers,
            [id]: value,
        });
    };

    const handleQuizSubmit = () => {
        let correct = 0;
        let incorrect = 0;

        quizData.forEach(item => {
            if (answers[item.id] && answers[item.id].toLowerCase() === item.meaning.toLowerCase()) {
                correct++;
            } else {
                incorrect++;
            }
        });

        const newScore = {
            ...score,
            [selectedCategory]: {
                ...score[selectedCategory],
                [selectedDay]: { correct, incorrect, total: quizData.length }
            }
        };
        setScore(newScore);
        localStorage.setItem('score', JSON.stringify(newScore));
        setIsQuizModalOpen(false);
        setAnswers({});

        alert(`맞은 개수: ${correct}\n틀린 개수: ${incorrect}`);
    };

    const days = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="home-main-container">
            <div className="menu-bar">
                <div className={`menu-item ${selectedCategory === 'elementary' ? 'active' : ''}`} onClick={() => handleCategoryClick('elementary')}>초등학교</div>
                <div className={`menu-item ${selectedCategory === 'middle' ? 'active' : ''}`} onClick={() => handleCategoryClick('middle')}>중학교</div>
                <div className={`menu-item ${selectedCategory === 'high' ? 'active' : ''}`} onClick={() => handleCategoryClick('high')}>고등학교</div>
            </div>
            {selectedCategory ? (
                <div className="content">
                    <div className="day-menu">
                        {days.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(day => (
                            <div key={day} className="day-item-container">
                                <div className="day-item" onClick={() => handleDayClick(day)}>
                                    {day}일차
                                    {score[selectedCategory] && score[selectedCategory][day] && (
                                        <div className="score-container">
                                            <div>점수: {score[selectedCategory][day].correct} / {score[selectedCategory][day].total}</div>
                                            <div className="score-bar">
                                                <div className="correct-bar" style={{ width: `${(score[selectedCategory][day].correct / score[selectedCategory][day].total) * 100}%` }}></div>
                                                <div className="incorrect-bar" style={{ width: `${(score[selectedCategory][day].incorrect / score[selectedCategory][day].total) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button className="quiz-button" onClick={() => handleQuizClick(day)}>퀴즈</button>
                            </div>
                        ))}
                    </div>
                    <div className="pagination">
                        {currentPage > 1 && <button onClick={handlePreviousPage}>이전</button>}
                        {currentPage < Math.ceil(days.length / itemsPerPage) && <button onClick={handleNextPage}>다음</button>}
                    </div>
                </div>
            ) : (
                <div className="placeholder">
                    <p>현재 학력을 선택해주세요.</p>
                </div>
            )}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} day={selectedDay} data={dayData} />
            <QuizModal
                isOpen={isQuizModalOpen}
                onClose={handleCloseQuizModal}
                day={selectedDay}
                data={quizData}
                answers={answers}
                onAnswerChange={handleAnswerChange}
                onSubmit={handleQuizSubmit}
                score={score}
            />
        </div>
    );
};

export default HomeMain;
