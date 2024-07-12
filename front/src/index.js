import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './Login';
import Home from './Home';
import WordDetail  from "./WordDetail";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* 변경됨 */}
                <Route path="/home" element={<Home />} />
                <Route path="/word" element={<WordDetail/>} />
            </Routes>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
