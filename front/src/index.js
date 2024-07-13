import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './Login';
import Home from './Home';
import WordDetail  from "./WordDetail";
import Game from "./Game";
import reportWebVitals from './reportWebVitals';
import MyStudy from "./MyStudy";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* 변경됨 */}
                <Route path="/home" element={<Home />} />
                <Route path="/word" element={<WordDetail/>} />
                <Route path="/game" element={<Game/>} />
                <Route path="/MyStudy" element={<MyStudy/>} />
            </Routes>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
