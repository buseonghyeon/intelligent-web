import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import QuizModal from "./QuizModal";
import QuestionModal from "./QuestionModal";
import axios from "axios";
import "../css/HomeMain.css";

const HomeMain = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [dayData, setDayData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState({});
  const [isCustomLearning, setIsCustomLearning] = useState(false);
  const itemsPerPage = 5;

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const savedScore = JSON.parse(localStorage.getItem("score"));
    if (savedScore && savedScore[userId]) {
      setScore(savedScore[userId]);
    }

    const customLearningState =
        JSON.parse(localStorage.getItem("customLearningState")) || {};
    setIsCustomLearning(customLearningState[userId] || false);
  }, [userId]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedDay("");
    setCurrentPage(1);
    setDayData([]);
    setAnswers([]);
  };

  const handleDayClick = async (day) => {
    setSelectedDay(day);
    try {
      const response = await axios.get(
          `http://localhost:5000/words/${selectedCategory}/${day}`,
          {
            params: { userId },
          }
      );
      setDayData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching day data:", error);
    }
  };

  const handleQuizClick = async (day) => {
    setSelectedDay(day);
    try {
      const response = await axios.get(
          `http://localhost:5000/words/${selectedCategory}/${day}`,
          {
            params: { userId },
          }
      );
      setQuizData(response.data);
      setAnswers(new Array(response.data.length).fill(''));
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
    setAnswers([]);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleAnswerChange = (newAnswers) => {
    setAnswers(newAnswers);
  };

  const handleQuizSubmit = () => {
    let correct = 0;
    let incorrect = 0;

    quizData.forEach((item, index) => {
      if (
          answers[index] &&
          answers[index].toLowerCase() === item.meaning.toLowerCase()
      ) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const newScore = {
      ...score,
      [selectedCategory]: {
        ...score[selectedCategory],
        [selectedDay]: { correct, incorrect, total: quizData.length },
      },
    };

    const updatedScores = JSON.parse(localStorage.getItem("score")) || {};
    updatedScores[userId] = newScore;
    localStorage.setItem("score", JSON.stringify(updatedScores));

    setScore(newScore);
    setIsQuizModalOpen(false);
    setAnswers([]);

    alert(`맞은 개수: ${correct}\n틀린 개수: ${incorrect}`);
  };

  const handleCustomLearningClick = () => {
    setIsQuestionModalOpen(true); // 설문조사 모달 열기
  };

  const handleQuestionSubmit = async (answers) => {
    setIsQuestionModalOpen(false);
    try {
      const response = await axios.post("http://localhost:5000/create-word", {
        userId,
        answers,
      });
      if (response.data.message === "Words created successfully!") {
        setIsCustomLearning(true); // 학습 버튼으로 전환
        const customLearningState =
            JSON.parse(localStorage.getItem("customLearningState")) || {};
        customLearningState[userId] = true;
        localStorage.setItem(
            "customLearningState",
            JSON.stringify(customLearningState)
        ); // 학습 상태 저장
      }
    } catch (error) {
      console.error("Error submitting questions:", error);
    }
  };

  const handleCloseQuestionModal = () => {
    setIsQuestionModalOpen(false);
  };

  const days = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
      <div className="home-main-container">
        <div className="menu-bar">
          <div
              className={`menu-item ${
                  selectedCategory === "elementary" ? "active" : ""
              }`}
              onClick={() => handleCategoryClick("elementary")}
          >
            초등학교
          </div>
          <div
              className={`menu-item ${
                  selectedCategory === "middle" ? "active" : ""
              }`}
              onClick={() => handleCategoryClick("middle")}
          >
            중학교
          </div>
          <div
              className={`menu-item ${selectedCategory === "high" ? "active" : ""}`}
              onClick={() => handleCategoryClick("high")}
          >
            고등학교
          </div>
          {!isCustomLearning && (
              <div className="menu-item" onClick={handleCustomLearningClick}>
                맞춤형
              </div>
          )}
          {isCustomLearning && (
              <div
                  className="menu-item"
                  onClick={() => handleCategoryClick("custom")}
              >
                학습
              </div>
          )}
        </div>
        {selectedCategory ? (
            <div className="content">
              <div className="day-menu">
                {days
                    .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                    )
                    .map((day) => (
                        <div key={day} className="day-item-container">
                          <div className="day-item" onClick={() => handleDayClick(day)}>
                            {day}일차
                            {score[selectedCategory] &&
                                score[selectedCategory][day] && (
                                    <div className="score-container">
                                      <div>
                                        점수: {score[selectedCategory][day].correct} /{" "}
                                        {score[selectedCategory][day].total}
                                      </div>
                                      <div className="score-bar">
                                        <div
                                            className="correct-bar"
                                            style={{
                                              width: `${
                                                  (score[selectedCategory][day].correct /
                                                      score[selectedCategory][day].total) *
                                                  100
                                              }%`,
                                            }}
                                        ></div>
                                        <div
                                            className="incorrect-bar"
                                            style={{
                                              width: `${
                                                  (score[selectedCategory][day].incorrect /
                                                      score[selectedCategory][day].total) *
                                                  100
                                              }%`,
                                            }}
                                        ></div>
                                      </div>
                                    </div>
                                )}
                          </div>
                          <button
                              className="quiz-button"
                              onClick={() => handleQuizClick(day)}
                          >
                            퀴즈
                          </button>
                        </div>
                    ))}
              </div>
              <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={handlePreviousPage}>이전</button>
                )}
                {currentPage < Math.ceil(days.length / itemsPerPage) && (
                    <button onClick={handleNextPage}>다음</button>
                )}
              </div>
            </div>
        ) : (
            <div className="placeholder">
              <p>현재 학력을 선택해주세요.</p>
            </div>
        )}
        <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            day={selectedDay}
            data={dayData}
        />
        <QuizModal
            isOpen={isQuizModalOpen}
            onClose={handleCloseQuizModal}
            day={selectedDay}
            data={quizData}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onSubmit={handleQuizSubmit}
        />
        <QuestionModal
            isOpen={isQuestionModalOpen}
            onClose={handleCloseQuestionModal}
            onSubmit={handleQuestionSubmit}
        />
      </div>
  );
};

export default HomeMain;
