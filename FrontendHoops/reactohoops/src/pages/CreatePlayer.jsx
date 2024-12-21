import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar component
import "../Content.css"; // Import the CSS file for styling

const CreatePlayer = () => {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [teamId, setTeamId] = useState("");
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Define the list of valid positions
    const positions = ["Guard", "Forward", "Center"];

    // Fetch all teams when the component mounts
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await api.get("/teams");
                setTeams(response.data);
            } catch (error) {
                setError("Failed to fetch teams.");
            }
        };

        fetchTeams();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message

        // Log the data being sent
        console.log("Submitting data:", { name, position, height, weight, team_id: teamId });

        // Validate input data
        if (!name || !position || !teamId) {
            setError("Name, Position, and Team are required.");
            return;
        }

        try {
            const response = await api.post(
                "/players",
                { name, position, height, weight, team_id: teamId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            console.log("Player created successfully:", response.data);
            navigate(`/teams/${teamId}/players`); // Redirect to the team's players page after successful player creation
        } catch (error) {
            console.error("Failed to create player:", error.response?.data || error.message);
            setError("Failed to create player. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="centered-container">
                <div className="centered-content">
                    <h2>Create New Player</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit} className="create-form">
                        <div className="form-group">
                            <label>Player Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Position</label>
                            <select
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
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
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Weight</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Team</label>
                            <select
                                value={teamId}
                                onChange={(e) => setTeamId(e.target.value)}
                                required
                            >
                                <option value="">Select Team</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name} ({team.city})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="add-favorite-btn">Create Player</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePlayer;
