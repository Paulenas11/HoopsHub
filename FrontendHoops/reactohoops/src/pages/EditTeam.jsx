import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar component
import "../Content.css"; // Import the CSS file for styling

const EditTeam = () => {
    const [team, setTeam] = useState({ name: "", city: "" });
    const [error, setError] = useState(""); // Error message
    const navigate = useNavigate();
    const { teamId } = useParams(); // Get teamId from the URL

    // Fetch team data when the component mounts
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await api.get(`/teams/${teamId}`);
                setTeam(response.data); // Set team data to state
            } catch (error) {
                setError("Failed to fetch team.");
            }
        };

        fetchTeam();
    }, [teamId]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message

        // Get the JWT token from localStorage
        const token = localStorage.getItem("access_token");

        if (!token) {
            // If there's no token, return an error (unauthorized)
            setError("You must be logged in to update a team.");
            return;
        }

        try {
            // Send PUT request to update team with Authorization header
            const response = await api.put(`/teams/${teamId}`, { ...team }, {
                headers: {
                    Authorization: `Bearer ${token}`  // Add the token to the Authorization header
                }
            });

            console.log("Team updated successfully:", response.data);
            navigate("/teams"); // Redirect to the teams page after successful update
        } catch (error) {
            console.error("Failed to update team:", error.response?.data || error.message);
            setError("Failed to update team. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="centered-container">
                <div className="centered-content">
                    <h2>Edit Team</h2>
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
                        <button type="submit" className="add-favorite-btn">Update Team</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditTeam;
