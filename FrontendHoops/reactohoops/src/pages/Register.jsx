import React, { useState } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import "../Content.css"; // Ensure the CSS file is imported

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // State to store error messages
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error state on each attempt

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await api.post("/register", { username, password });
            console.log("Registration successful:", response.data);
            navigate("/login"); // Redirect to the login page
        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);

            // Check if error response has an error message
            if (error.response && error.response.status === 400) {
                setError("Username already taken. Please try another one.");
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="centered-container">
            <div className="centered-content">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="search-input"
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="search-input"
                            required
                        />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="search-input"
                            required
                        />
                    </div>
                    <button type="submit" className="favorite-btn">Register</button>
                </form>
                {error && <p className="error-message">{error}</p>} {/* Show error message */}
            </div>
        </div>
    );
};

export default Register;
