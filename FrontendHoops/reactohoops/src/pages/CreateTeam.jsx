import React, { useState } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar component
import "../Content.css"; // Import the CSS file for styling

const CreateTeam = () => {
    const [team, setTeam] = useState({ name: "", city: "" });
    const [error, setError] = useState(""); // Error message
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message

        // Get the JWT token from localStorage
        const token = localStorage.getItem("access_token");

        if (!token) {
            // If there's no token, return an error (unauthorized)
            setError("You must be logged in to create a team.");
            return;
        }

        try {
            // Send POST request to create a new team with Authorization header
            const response = await api.post(
                "/teams",
                { ...team },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
                    },
                }
            );

            console.log("Team created successfully:", response.data);
            navigate("/teams"); // Redirect to the teams page after successful creation
        } catch (error) {
            console.error("Failed to create team:", error.response?.data || error.message);
            setError("Failed to create team. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="centered-container">
                <div className="centered-content">
                    <h2>Create New Team</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit} className="create-form">
                        <div className="form-group">
                            <label>Team Name</label>
                            <input
                                type="text"
                                value={team.name}
                                onChange={(e) => setTeam({ ...team, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                value={team.city}
                                onChange={(e) => setTeam({ ...team, city: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="add-favorite-btn">Create Team</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTeam;
