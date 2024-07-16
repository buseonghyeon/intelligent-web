import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div><img className="logo" src={"/images/logo.png"} alt="Logo" /></div> {/* Self-closing tag */}
            <div className="menu">
                <Link to="/home">Home</Link>
                <Link to="/mystudy">Study</Link>
                <Link to="/mypage">Mypage</Link>
                <Link to="/game">Game</Link>
                <Link to="/Chat">Chat</Link> {/* Chat 링크 수정 */}
            </div>
        </nav>
    );
};

export default Navbar;
