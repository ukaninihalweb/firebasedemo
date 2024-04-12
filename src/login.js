import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css'; // Import your CSS file for styling

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for error handling

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/home");
                console.log(user);
            })
            .catch((error) => {
                // Handle login errors
                setError(error.message);
                console.error(error.code, error.message);
            });
    };

    return (
        <main className="login-container">
            <section className="login-section">
                <div className="login-form">
                    <h2>Data Authentication</h2>
                    <form>
                        <div className="input-group">
                            <label htmlFor="email-address">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <div className="input-group">
                            <button
                                className="login-button"
                                onClick={onLogin}
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="signup-link">
                        No account yet?{' '}
                        <NavLink to="/signup">Sign up</NavLink>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Login;
