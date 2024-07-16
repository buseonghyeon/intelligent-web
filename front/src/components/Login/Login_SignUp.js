import React, { useState } from "react";
import axios from "axios";
import "../../css/Login/Login_SignUp.css";
import Swal from "sweetalert2";

const SignUpForm = ({ toggle }) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSignUpClicked, setIsSignUpClicked] = useState(false);

    const handleSignUp = async () => {
        console.log("Sign up button clicked");
        setIsSignUpClicked(true);

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/register", {
                id,
                name,
                email,
                password,
            });
            console.log("User registered", response.data);
            Swal.fire({
                title: "회원 가입 되었습니다.",
                icon: "success",
            });
        } catch (error) {
            console.error("There was an error registering the user!", error);
            Swal.fire({
                icon: "error",
                title: "회원가입에 실패했습니다.",
            });
        }
    };

    return (
        <div className="form-wrapper align-items-center">
            <div className="form sign-up">
                <div className="input-group">
                    <i className="bx bxs-id-card"></i>
                    <input
                        type="text"
                        placeholder="ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <i className="bx bxs-user"></i>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <i className="bx bx-mail-send"></i>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    className={isSignUpClicked ? "clicked" : ""}
                    onClick={handleSignUp}
                >
                    Sign up
                </button>
                <p>
                    <span>Already have an account?</span>
                    <b onClick={toggle} className="pointer">
                        Sign in here
                    </b>
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;
