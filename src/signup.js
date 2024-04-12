import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import './App.css'; // Import your CSS file for styling

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for error handling

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            navigate("/login");
        } catch (error) {
            setError(error.message);
            console.error(error.code, error.message);
        }
    };

    return (
        <main className="signup-container">
            <section className="signup-section">
                <div className="signup-form">
                    <h1>Sign up For For Authentication</h1>
                    <form onSubmit={onSubmit}>
                        <div className="input-group">
                            <label htmlFor="email-address">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email address"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button className="signup-button" type="submit">Sign up</button>
                    </form>

                    <p>
                        Already have an account?{' '}
                        <NavLink to="/login">Sign in</NavLink>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Signup;
