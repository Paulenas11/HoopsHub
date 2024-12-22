import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar component
import "../Content.css"; // Import the CSS file for Content

const Players = () => {
    const [players, setPlayers] = useState([]);
    const [teamName, setTeamName] = useState(""); // State for the team name
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { teamId } = useParams(); // Get teamId from the URL

    // Get the role from localStorage
    const role = localStorage.getItem("role");

    // Fetch players and team name when the component mounts
    useEffect(() => {
        const fetchTeamAndPlayers = async () => {
            try {
                // Fetch team details
                const teamResponse = await api.get(`/teams/${teamId}`);
                setTeamName(teamResponse.data.name); // Set the team name

                // Fetch players for the team
                const playersResponse = await api.get(`/teams/${teamId}/players`);
                setPlayers(playersResponse.data); // Set players in state
                setLoading(false); // Stop loading
            } catch (error) {
                setError("Failed to fetch team or players.");
                setLoading(false); // Stop loading
            }
        };

        fetchTeamAndPlayers();
    }, [teamId]); // Re-fetch when teamId changes

    // Get the JWT token from localStorage
    const token = localStorage.getItem("access_token");

    const handleDelete = async (playerId) => {
        if (role !== "administrator") {
            setError("You must be an administrator to delete a player.");
            return;
        }

        try {
            if (!token) {
                setError("You must be logged in to delete a player.");
                return;
            }

            await api.delete(`/players/${playerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token to header
                },
            });
            setPlayers(players.filter((player) => player.id !== playerId)); // Remove the deleted player from the list
        } catch (error) {
            console.error("Failed to delete player:", error.message);
            setError("Failed to delete player. Please try again.");
        }
    };

    const handleEdit = (playerId) => {
        if (role !== "administrator") {
            setError("You must be an administrator to edit a player.");
            return;
        }

        // Redirect to the player edit page
        navigate(`/edit-player/${playerId}`);
    };

    if (loading) {
        return <div>Loading players...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="centered-container">
                <div className="centered-content">
                    <h2>Players for Team: {teamName}</h2> {/* Use teamName instead of teamId */}
                    <ul className="team-list">
                        {players.map((player) => (
                            <li key={player.id} className="team-item">
                                <div className="team-info">
                                    <div className="team-details">
                                        <p><strong>Name:</strong> {player.name}</p>
                                        <p><strong>Position:</strong> {player.position}</p>
                                        {player.height && <p><strong>Height:</strong> {player.height}</p>}
                                        {player.weight && <p><strong>Weight:</strong> {player.weight}</p>}
                                    </div>
                                    <div className="team-actions">
                                        {role === "administrator" && (
                                            <>
                                                <button className="favorite-btn" onClick={() => handleEdit(player.id)}>Edit</button>
                                                <button className="remove-btn" onClick={() => handleDelete(player.id)}>Delete</button>
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

export default Players;
