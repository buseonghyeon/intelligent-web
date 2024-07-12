import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/Login/Login_SignIn.css'

const SignInForm = ({ toggle }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                id,
                password
            });
            console.log('Login successful', response.data);
            alert('Login successful');
            localStorage.setItem('userId', id);
            navigate('/app');
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert('Error logging in');
        }
    };

    return (
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
    );
};

export default SignInForm;
