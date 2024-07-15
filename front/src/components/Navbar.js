import React from 'react';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div><img className="logo" src={"/images/logo.png"}></img></div>
            <div className="menu">
                <a href={"http://localhost:3000/home"}>Home</a>
                <a href={"http://localhost:3000/mystudy"}>Study</a>
                <a href={"/mypage"}>Mypage</a>
                <a href={"http://localhost:3000/game"}>Game</a>
            </div>
        </nav>
    );
};

export default Navbar;
