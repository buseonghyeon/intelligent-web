import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './Login';
import Home from './Home';
import WordDetail from './WordDetail';
import Game from './Game';
import MyStudy from './MyStudy';
import MyPage from './MyPage';
import Chat from './Chat';
import { DarkModeProvider } from './DarkModeContext';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <DarkModeProvider>
            <Router>

                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/word" element={<WordDetail />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/MyStudy" element={<MyStudy />} />
                    <Route path="/MyPage" element={<MyPage />} />
                    <Route path="/Chat" element={<Chat />} />
                </Routes>
            </Router>
        </DarkModeProvider>
    </React.StrictMode>
);

reportWebVitals();
