import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
import "./css/Login.css";

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignUpClicked, setIsSignUpClicked] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        setTimeout(() => {
            setIsSignIn(true);
        }, 200);
    }, []);

    const toggle = () => {
        setIsSignIn(!isSignIn);
    };

    const handleSignUp = async () => {
        console.log('Sign up button clicked');
        setIsSignUpClicked(true);

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', {
                id,
                name,
                email,
                password
            });
            console.log('User registered', response.data);
            alert('User registered');
        } catch (error) {
            console.error('There was an error registering the user!', error);
            alert('Error registering user');
        }
    };

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                id,
                password
            });
            console.log('Login successful', response.data);
            alert('Login successful');
            localStorage.setItem('userId', id); // 로그인 성공 시 로컬 스토리지에 사용자 ID 저장
            navigate('/'); // 로그인 성공 시 app.js로 리다이렉션
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert('Error logging in');
        }
    };

    return (
        <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
            <div className="row">
                {/* SIGN UP */}
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-up">
                            <div className="input-group">
                                <i className='bx bxs-id-card'></i>
                                <input
                                    type="text"
                                    placeholder="ID"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-user'></i>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <i className='bx bx-mail-send'></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button
                                className={isSignUpClicked ? 'clicked' : ''}
                                onClick={handleSignUp}
                            >
                                Sign up
                            </button>
                            <p>
                                <span>Already have an account?</span>
                                <b onClick={toggle} className="pointer">Sign in here</b>
                            </p>
                        </div>
                    </div>
                </div>
                {/* END SIGN UP */}
                {/* SIGN IN */}
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-in">
                            <div className="input-group">
                                <i className='bx bxs-id-card'></i>
                                <input
                                    type="text"
                                    placeholder="ID"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button onClick={handleSignIn}>Sign in</button>
                            <p>
                                <span>Don't have an account?</span>
                                <b onClick={toggle} className="pointer">Sign up here</b>
                            </p>
                        </div>
                    </div>
                </div>
                {/* END SIGN IN */}
            </div>
            <div className="row content-row">
                {/* SIGN IN CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="text sign-in">
                        <h2>Welcome</h2>
                    </div>
                    <div className="img sign-in"></div>
                </div>
                {/* END SIGN IN CONTENT */}
                {/* SIGN UP CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="img sign-up"></div>
                    <div className="text sign-up">
                        <h2>Join with us</h2>
                    </div>
                </div>
                {/* END SIGN UP CONTENT */}
            </div>
        </div>
    );
};

export default Login;
