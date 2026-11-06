
import { useState } from 'react';
import { LoginUser } from '../Services/authService';
import '../Styles/Login.css';
import { useAuth } from "../Context/AuthContext";
import {
    GraduationCap,
    UserRound,
    LockKeyhole,
    BookOpen,
    Users,
    ShieldCheck,
    ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const [uname, setUname] = useState('');
    const [upassword, setUpassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleLogin(e) {
        e.preventDefault();

        setErrorMessage('');
        setLoading(true);

        try {
            const response = await LoginUser({
                username: uname,
                password: upassword
            });

            await login(response.data.token);
            navigate("/dashboard");

        } catch (error) {
            setErrorMessage(
                error.response?.data?.message ||
                'Invalid username or password. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">

            <div className="login-wrapper">

                {/* Left Welcome Section */}
                <div className="login-welcome">

                    <div className="welcome-brand">
                        <div className="brand-icon">
                            <GraduationCap size={32} />
                        </div>

                        <span>STUDENT PORTAL</span>
                    </div>

                    <div className="welcome-content">

                        <span className="welcome-tag">
                            <ShieldCheck size={16} />
                            Smart Education Management
                        </span>

                        <h1>
                            Manage Your
                            <span> Learning Journey</span>
                        </h1>

                        <p>
                            Welcome to your Student Management System.
                            Access student information, manage academic
                            records and stay connected with your education.
                        </p>

                        <div className="welcome-features">

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <Users size={21} />
                                </div>
                                <div>
                                    <h4>Student Management</h4>
                                    <p>Manage student records easily</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <BookOpen size={21} />
                                </div>
                                <div>
                                    <h4>Academic Information</h4>
                                    <p>Keep information organised</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="welcome-footer">
                        © 2026 Student Management System
                    </div>

                    <div className="welcome-circle circle-one"></div>
                    <div className="welcome-circle circle-two"></div>

                </div>


                {/* Right Login Section */}
                <div className="login-card">

                    <div className="login-form-content">

                        <div className="mobile-brand-icon">
                            <GraduationCap size={35} />
                        </div>

                        <div className="login-heading">
                            <span>WELCOME BACK</span>
                            <h2>Sign in to your account</h2>
                            <p>
                                Enter your credentials to access your dashboard.
                            </p>
                        </div>

                        <form onSubmit={handleLogin}>

                            <div className="form-group">

                                <label htmlFor="username">
                                    Username
                                </label>

                                <div className="input-wrapper">
                                    <UserRound size={19} />

                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={uname}
                                        onChange={(e) => setUname(e.target.value)}
                                        autoComplete="username"
                                        required
                                    />
                                </div>

                            </div>


                            <div className="form-group">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <div className="input-wrapper">
                                    <LockKeyhole size={19} />

                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={upassword}
                                        onChange={(e) => setUpassword(e.target.value)}
                                        autoComplete="current-password"
                                        required
                                    />
                                </div>

                            </div>


                            {errorMessage && (
                                <div className="login-error">
                                    {errorMessage}
                                </div>
                            )}


                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}

                                {!loading && <ArrowRight size={19} />}
                            </button>

                        </form>


                        <div className="register-section">
                            <p>
                                Don't have an account?
                                <Link to="/register">
                                    Create an account
                                </Link>
                            </p>
                        </div>

                        <div className="login-security">
                            <ShieldCheck size={16} />
                            Secure login protected by authentication
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
