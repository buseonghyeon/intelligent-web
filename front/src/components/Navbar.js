import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { DarkModeContext } from '../DarkModeContext';

const Navbar = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    return (
        <nav className="navbar">
            <div><img className="logo" src={"/images/logo.png"} alt="Logo" /></div>
            <div className="menu">
                <Link to="/home">Home</Link>
                <Link to="/mystudy">Study</Link>
                <Link to="/mypage">Mypage</Link>
                <Link to="/game">Game</Link>
                <Link to="/Chat">Chat</Link>
                <button className="dark-mode-button" onClick={toggleDarkMode}>
                    {darkMode ? '🌞' : '🌜'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
