import React from 'react';
import '../css/Modal.css';

const Modal = ({ isOpen, onClose, day, data }) => {
    if (!isOpen) {
        return null;
    }

    const speak = async (text) => {
        try {
            const response = await fetch('http://localhost:5000/speak', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.play();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{day}일차 내용</h2>
                {data.length > 0 ? (
                    <div className="modal-scroll">
                        <ol>
                            {data.map((item, index) => (
                                <li key={item.id}>
                                    <p className="line">
                                        <strong>단어:</strong> {item.word}
                                        <button className="speaker-button" onClick={() => speak(item.word)}>🔊</button>
                                    </p>
                                    <p className="line"><strong>의미:</strong> {item.meaning}</p>
                                    <p className="line">
                                        <strong>예문:</strong> {item.example}
                                        <button className="speaker-button" onClick={() => speak(item.example)}>🔊</button>
                                    </p>
                                    <p className="line"><strong>예문 해석:</strong> {item.example_meaning}</p>
                                    {index < data.length - 1 && <hr />} {/* 항목 간의 구분선을 추가 */}
                                </li>
                            ))}
                        </ol>
                    </div>
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default Modal;
