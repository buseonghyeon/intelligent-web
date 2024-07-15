import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './Login';
import Home from './Home';
import WordDetail from "./WordDetail";
import Game from "./Game";
import MyStudy from "./MyStudy";
import Chat from "./Chat";
import reportWebVitals from './reportWebVitals';
import { DarkModeProvider } from './components/DarkModeContext'; // Import DarkModeProvider

const App = () => (
    <DarkModeProvider>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/word" element={<WordDetail />} />
            <Route path="/game" element={<Game />} />
            <Route path="/MyStudy" element={<MyStudy />} />
            <Route path="/Chat" element={<Chat />} />
        </Routes>
    </DarkModeProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);

reportWebVitals();
