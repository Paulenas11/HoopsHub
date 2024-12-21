import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar component
import "../Content.css"; // Import the CSS file for styling

const EditPlayer = () => {
    const [player, setPlayer] = useState({ name: "", position: "", height: "", weight: "", team_id: "" });
    const [error, setError] = useState(""); // Error message
    const navigate = useNavigate();
    const { playerId } = useParams(); // Get playerId from the URL

    // Define the list of valid positions
    const positions = ["Guard", "Forward", "Center"];

    // Fetch player data when the component mounts
    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await api.get(`/players/${playerId}`);
                setPlayer(response.data); // Set player data to state
            } catch (error) {
                setError("Failed to fetch player data.");
            }
        };

        fetchPlayer();
    }, [playerId]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message

        // Validate input data
        if (!player.name || !player.position) {
            setError("Name and Position are required.");
            return;
        }

        try {
            // Send PUT request to update the player
            const response = await api.put(
                `/players/${playerId}`,
                { name: player.name, position: player.position, height: player.height, weight: player.weight, team_id: player.team_id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token in header
                    },
                }
            );
            console.log("Player updated successfully:", response.data);
            navigate(`/teams/${player.team_id}/players`); // Redirect to the players list after successful update
        } catch (error) {
            console.error("Failed to update player:", error.response?.data || error.message);
            setError("Failed to update player. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="centered-container">
                <div className="centered-content">
                    <h2>Edit Player</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit} className="create-form">
                        <div className="form-group">
                            <label>Player Name</label>
                            <input
                                type="text"
                                value={player.name}
                                onChange={(e) => setPlayer({ ...player, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Position</label>
                            <select
                                value={player.position}
                                onChange={(e) => setPlayer({ ...player, position: e.target.value })}
                                required
                            >
                                <option value="">Select Position</option>
                                {positions.map((pos, index) => (
                                    <option key={index} value={pos}>
                                        {pos}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Height</label>
                            <input
                                type="number"
                                value={player.height}
                                onChange={(e) => setPlayer({ ...player, height: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Weight</label>
                            <input
                                type="number"
                                value={player.weight}
                                onChange={(e) => setPlayer({ ...player, weight: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="add-favorite-btn">Update Player</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPlayer;
