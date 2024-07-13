import React from 'react';
import '../css/Modal.css';

const Modal = ({ isOpen, onClose, day, data }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{day}일차 내용</h2>
                {data.length > 0 ? (
                    <div className="modal-scroll">
                        <ol>
                            {data.map((item, index) => (
                                <li key={item.id}>
                                    <p><strong>단어:</strong> {item.word}</p>
                                    <p><strong>의미:</strong> {item.meaning}</p>
                                    <p><strong>예문:</strong> {item.example}</p>
                                    <p><strong>예문 해석:</strong> {item.example_meaning}</p>
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
