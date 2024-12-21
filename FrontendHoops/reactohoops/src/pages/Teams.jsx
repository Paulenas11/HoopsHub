import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../Content.css"; // Ensure the CSS file is imported

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Get the role from localStorage
    const role = localStorage.getItem("role");

    // Fetch teams on component mount
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await api.get("/teams"); // Fetch teams from the backend
                setTeams(response.data); // Set teams in state
                setLoading(false); // Stop loading
            } catch (error) {
                setError("Failed to fetch teams.");
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    // Get the JWT token from localStorage
    const token = localStorage.getItem("access_token");

    // Handle delete (only if user is an admin)
    const handleDelete = async (teamId) => {
        if (role !== "administrator") {
            setError("You must be an administrator to delete a team.");
            return;
        }

        try {
            if (!token) {
                setError("You must be logged in to delete a team.");
                return;
            }

            // Delete the team
            await api.delete(`/teams/${teamId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token to the Authorization header
                },
            });

            setTeams(teams.filter((team) => team.id !== teamId)); // Remove the deleted team from the list
        } catch (error) {
            console.error("Failed to delete team:", error.response?.data || error.message);
            setError("Failed to delete team. Please try again.");
        }
    };

    // Handle edit (only if user is an admin)
    const handleEdit = (teamId) => {
        if (role !== "administrator") {
            setError("You must be an administrator to edit a team.");
            return;
        }

        // Redirect to the team edit page
        navigate(`/edit-team/${teamId}`);
    };

    const handleCreateTeam = () => {
        if (role === "administrator") {
            navigate("/create-team");
        } else {
            setError("You must be an administrator to create a team.");
        }
    };

    const handleCreatePlayer = () => {
        if (role === "administrator") {
            navigate("/create-player");
        } else {
            setError("You must be an administrator to create a player.");
        }
    };

    if (loading) {
        return <div>Loading teams...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="centered-container">
                <div className="centered-content">
                    <h2>Teams</h2>

                    {/* Create Team and Create Player buttons visible only to admins */}
                    {role === "administrator" && (
                        <div>
                            <button className="add-favorite-btn" onClick={handleCreateTeam}>Create Team</button>
                            <button className="add-favorite-btn" onClick={handleCreatePlayer}>Create Player</button>
                        </div>
                    )}

                    <ul className="team-list">
                        {teams.map((team) => (
                            <li key={team.id} className="team-item">
                                <div className="team-info">
                                    <div className="team-details">
                                        <p><strong>Name:</strong> {team.name}</p>
                                        <p><strong>City:</strong> {team.city}</p>
                                        {team.coach && <p><strong>Coach:</strong> {team.coach}</p>}
                                        {team.founded && <p><strong>Founded:</strong> {team.founded}</p>}
                                        {team.championships && <p><strong>Championships:</strong> {team.championships.join(", ")}</p>}
                                    </div>
                                    <div className="team-actions">
                                        <button className="favorite-btn" onClick={() => navigate(`/teams/${team.id}/players`)}>View Players</button>
                                        {role === "administrator" && (
                                            <>
                                                <button className="favorite-btn" onClick={() => handleEdit(team.id)}>Edit</button>
                                                <button className="remove-btn" onClick={() => handleDelete(team.id)}>Delete</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Teams;
