import React from 'react';
import '../css/Modal.css';

const QuizModal = ({ isOpen, onClose, day, data, answers, onAnswerChange, onSubmit, score }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{day}일차 퀴즈</h2>
                {data.length > 0 ? (
                    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                        {data.map((item) => (
                            <div key={item.id}>
                                <p><strong>단어:</strong> {item.word}</p>
                                <input
                                    type="text"
                                    value={answers[item.id] || ''}
                                    onChange={(e) => onAnswerChange(item.id, e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="submit">제출</button>
                    </form>
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default QuizModal;
