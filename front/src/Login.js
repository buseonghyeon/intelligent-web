import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './components/Login/Login_SignUp';
import SignInForm from './components/Login/Login_SignIn';
import './css/Login/Login.css'; // 공통 스타일 파일

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setIsSignIn(true);
        }, 200);
    }, []);

    const toggle = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
            <div className="row">
                <div className="col align-items-center flex-col sign-up">
                    <SignUpForm toggle={toggle} />
                </div>
                <div className="col align-items-center flex-col sign-in">
                    <SignInForm toggle={toggle} />
                </div>
            </div>
            <div className="row content-row">
                <div className="col align-items-center flex-col">
                    <div className="text sign-in">
                        <h2>Welcome</h2>
                    </div>
                    <div className="img sign-in"></div>
                </div>
                <div className="col align-items-center flex-col">
                    <div className="img sign-up"></div>
                    <div className="text sign-up">
                        <h2>Join with us</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
