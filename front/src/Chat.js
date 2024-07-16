import React, { useState, useContext } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar'; // Navbar 경로 수정
import './Chat.css';
import { DarkModeContext } from './DarkModeContext';

const Chat = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [messages, setMessages] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = async (event) => {
                const audioBlob = event.data;
                const formData = new FormData();
                formData.append('file', audioBlob, 'recording.wav');

                const userMessage = { sender: 'user', text: '사용자의 음성을 텍스트로 변환 중...' };
                setMessages((prevMessages) => [...prevMessages, userMessage]);

                try {
                    const response = await axios.post('http://localhost:5000/chat', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    const { text, response: reply } = response.data;
                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages];
                        updatedMessages[updatedMessages.length - 1] = { sender: 'user', text };
                        return [...updatedMessages, { sender: 'gpt', text: reply }];
                    });
                } catch (error) {
                    console.error('Error:', error);
                    setMessages((prevMessages) => [...prevMessages, { sender: 'error', text: 'Error processing your request' }]);
                } finally {
                    setLoading(false);
                }
            };
            mediaRecorder.start();
            setRecorder(mediaRecorder);
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const handleStopRecording = () => {
        if (recorder) {
            recorder.stop();
            setIsRecording(false);
            setLoading(true);
        }
    };

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
        <div className="page-container">
            <Navbar /> {/* Navbar 추가 */}
            <div className={`chat-container ${darkMode ? 'dark' : ''}`}>
                <div className="header">
                    <h2 className="chat-title">AI 영어 채팅 서비스</h2>
                </div>
                <p className="chat-description">영어로 대화를 시작하세요. AI가 당신의 대화를 분석 후 대화를 합니다.</p>
                <button className="record-button" onClick={isRecording ? handleStopRecording : handleStartRecording}>
                    {isRecording ? '대화 중지' : '대화 시작'}
                </button>
                <div className="messages-container">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender} ${darkMode ? 'dark' : ''}`}>
                            <p>{message.text}</p>
                            {message.sender === 'gpt' && (
                                <button className="speaker-button" onClick={() => speak(message.text)}>🔊</button>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="loading">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
