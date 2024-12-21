import React, { useState } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import "../Content.css"; // Ensure the CSS file is imported

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to store error messages
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error state on each attempt

        try {
            const response = await api.post("/login", { username, password });
            const { access_token, refresh_token, role } = response.data; // Extract role from response

            // Store JWT tokens and username in localStorage
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            localStorage.setItem("username", username);
            localStorage.setItem("role", role); // Store role in localStorage

            console.log("Login successful:", response.data);

            // Redirect and refresh the page
            if (role === "administrator") {
                navigate("/admin-dashboard");
            } else {
                navigate("/");
            }
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);

            // Check if error response has an error message
            if (error.response && error.response.status === 401) {
                setError("Invalid username or password. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="centered-container">
            <div className="centered-content">
                <h2>Login</h2>
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
                    <button type="submit" className="favorite-btn">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>} {/* Show error message */}
                <button onClick={() => navigate("/register")} className="add-favorite-btn">Register</button> {/* Register button */}
            </div>
        </div>
    );
};

export default Login;
