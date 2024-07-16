import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { DarkModeContext } from '../DarkModeContext';

const Navbar = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    return (
        <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
            <div><img className="logo" src={"/images/Logo.png"} alt="Logo" /></div>
            <div className="menu">
                <Link to="/home">Home</Link>
                <Link to="/mystudy">Study</Link>
                <Link to="/mypage">Mypage</Link>
                <Link to="/game">Game</Link>
                <Link to="/Chat">Chat</Link>
                <span className="dark-mode-toggle" onClick={toggleDarkMode}>
                    {darkMode ? '🌞' : '🌜'}
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
