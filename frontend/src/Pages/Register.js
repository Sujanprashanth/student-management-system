
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    GraduationCap,
    UserRound,
    Mail,
    LockKeyhole,
    BookOpen,
    Users,
    ShieldCheck,
    ArrowRight,
    CircleCheck
} from "lucide-react";

import api from "../Services/api";
import "../Styles/Register.css";

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister(e) {

        e.preventDefault();

        setMessage("");
        setError("");

        if (
            !username.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {

            const resp = await api.post("/api/auth/register", {
                username: username,
                email: email,
                password: password
            });

            setMessage(
                typeof resp.data === "string"
                    ? resp.data
                    : resp.data.message || "Registration successful!"
            );

            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (error) {

            console.error("Registration error:", error);

            setError(
                error?.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="register-container">

            <div className="register-wrapper">

                {/* LEFT WELCOME SECTION */}

                <div className="register-welcome">

                    <div className="register-brand">

                        <div className="register-brand-icon">
                            <GraduationCap size={32} />
                        </div>

                        <span>STUDENT PORTAL</span>

                    </div>


                    <div className="register-welcome-content">

                        <span className="register-welcome-tag">
                            <ShieldCheck size={16} />
                            Join Our Learning Community
                        </span>

                        <h1>
                            Start Your
                            <span> Academic Journey</span>
                        </h1>

                        <p>
                            Create your account and become part of
                            our Student Management System. Manage
                            your academic information with ease.
                        </p>


                        <div className="register-features">

                            <div className="register-feature-item">

                                <div className="register-feature-icon">
                                    <Users size={21} />
                                </div>

                                <div>
                                    <h4>Easy Account Access</h4>
                                    <p>Access your student dashboard</p>
                                </div>

                            </div>


                            <div className="register-feature-item">

                                <div className="register-feature-icon">
                                    <BookOpen size={21} />
                                </div>

                                <div>
                                    <h4>Academic Management</h4>
                                    <p>Keep your information organised</p>
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="register-welcome-footer">
                        © 2026 Student Management System
                    </div>


                    <div className="register-circle register-circle-one"></div>
                    <div className="register-circle register-circle-two"></div>

                </div>


                {/* RIGHT REGISTRATION SECTION */}

                <div className="register-card">

                    <div className="register-form-content">

                        <div className="register-mobile-icon">
                            <GraduationCap size={35} />
                        </div>


                        <div className="register-heading">

                            <span>GET STARTED</span>

                            <h2>Create Your Account</h2>

                            <p>
                                Fill in your details to create a new account.
                            </p>

                        </div>


                        <form onSubmit={handleRegister}>


                            {/* USERNAME */}

                            <div className="register-field">

                                <label htmlFor="register-username">
                                    Username
                                </label>

                                <div className="register-input-wrapper">

                                    <UserRound size={19} />

                                    <input
                                        id="register-username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            setError("");
                                            setMessage("");
                                        }}
                                        autoComplete="username"
                                        required
                                    />

                                </div>

                            </div>


                            {/* EMAIL */}

                            <div className="register-field">

                                <label htmlFor="register-email">
                                    Email Address
                                </label>

                                <div className="register-input-wrapper">

                                    <Mail size={19} />

                                    <input
                                        id="register-email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError("");
                                            setMessage("");
                                        }}
                                        autoComplete="email"
                                        required
                                    />

                                </div>

                            </div>


                            {/* PASSWORD */}

                            <div className="register-field">

                                <label htmlFor="register-password">
                                    Password
                                </label>

                                <div className="register-input-wrapper">

                                    <LockKeyhole size={19} />

                                    <input
                                        id="register-password"
                                        type="password"
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError("");
                                            setMessage("");
                                        }}
                                        autoComplete="new-password"
                                        required
                                    />

                                </div>

                            </div>


                            {/* CONFIRM PASSWORD */}

                            <div className="register-field">

                                <label htmlFor="confirm-password">
                                    Confirm Password
                                </label>

                                <div className="register-input-wrapper">

                                    <LockKeyhole size={19} />

                                    <input
                                        id="confirm-password"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setError("");
                                            setMessage("");
                                        }}
                                        autoComplete="new-password"
                                        required
                                    />

                                </div>

                            </div>


                            {/* SUCCESS MESSAGE */}

                            {message && (

                                <div className="register-message">
                                    <CircleCheck size={18} />
                                    <span>{message}</span>
                                </div>

                            )}


                            {/* ERROR MESSAGE */}

                            {error && (

                                <div className="register-error">
                                    {error}
                                </div>

                            )}


                            {/* REGISTER BUTTON */}

                            <button
                                type="submit"
                                className="register-button"
                                disabled={loading}
                            >

                                {loading ? "Creating Account..." : "Create Account"}

                                {!loading && <ArrowRight size={19} />}

                            </button>

                        </form>


                        {/* LOGIN LINK */}

                        <div className="register-login-link">

                            <p>
                                Already have an account?

                                <Link to="/login">
                                    Sign In
                                </Link>
                            </p>

                        </div>


                        {/* SECURITY FOOTER */}

                        <div className="register-security">

                            <ShieldCheck size={16} />

                            Your account is protected with secure authentication.

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;
