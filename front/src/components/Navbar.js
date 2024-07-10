import React from 'react';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div><img className="logo" src={"/images/logo.png"}></img></div>
            <div className="menu">
                <a href={"http://localhost:3000"}>Menu 1</a>
                <a href={"#"}>Menu 2</a>
                <a href={"#"}>Menu 3</a>
                <a href={"#"}>Menu 4</a>
            </div>
        </nav>
    );
};

export default Navbar;
