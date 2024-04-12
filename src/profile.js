import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database, ref, set } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css'; // Import your CSS file for styling

const Profile = () => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for error handling

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if all fields are filled
            if (!fullname || !age || !gender || !city || !pincode || !email || !password) {
                throw new Error("All fields are required.");
            }

            // Check if age is a number
            if (isNaN(age)) {
                throw new Error("Age must be a number.");
            }

            // Check if pincode is exactly 6 digits
            if (pincode.length !== 6 || isNaN(pincode)) {
                throw new Error("Pincode must be exactly 6 digits.");
            }

            // Store additional profile information into Realtime Database
            await set(ref(database, '/users/' + user.uid), {
                fullname: fullname,
                age: parseInt(age),
                gender: gender,
                city: city,
                pincode: parseInt(pincode),
                email: email
            });

            console.log('Data is Stored into Realtime Database');
            alert('Data Added!');
            navigate("/login"); // Redirect to login after successful signup
        } catch (error) {
            setError(error.message);
            console.error(error.code, error.message);
        }
    };

    return (
        <main className="profile-container">
            <section className="profile-section">
                <div className="profile-form">
                    <h1>Data Stored In Real Time Database</h1>
                    <form onSubmit={onSubmit}>
                        <div className="input-group">
                            <label htmlFor="fullname">Full Name</label>
                            <input
                                type="text"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                required
                                placeholder="Full Name"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                                placeholder="Age"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="gender">Gender</label>
                            <input
                                type="text"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                                placeholder="Gender"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                placeholder="City"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="pincode">Pincode</label>
                            <input
                                type="number"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                required
                                placeholder="Pincode"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email Address"
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

export default Profile;
