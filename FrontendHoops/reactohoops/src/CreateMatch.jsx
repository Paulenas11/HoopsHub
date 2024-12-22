import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar component
import "../Content.css"; // Import the CSS file for styling

const CreateMatch = () => {
    const [date, setDate] = useState("");
    const [homeTeamId, setHomeTeamId] = useState("");
    const [awayTeamId, setAwayTeamId] = useState("");
    const [venueId, setVenueId] = useState("");
    const [homeTeamScore, setHomeTeamScore] = useState("");
    const [awayTeamScore, setAwayTeamScore] = useState("");
    const [teams, setTeams] = useState([]);
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await api.get("/teams");
                setTeams(response.data);
            } catch (error) {
                setError("Failed to fetch teams.");
            }
        };

        const fetchVenues = async () => {
            try {
                const response = await api.get("/venues");
                setVenues(response.data);
            } catch (error) {
                setError("Failed to fetch venues.");
            }
        };

        fetchTeams();
        fetchVenues();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validate required fields
        if (!date || !homeTeamId || !awayTeamId || !venueId) {
            setError("Date, Home Team, Away Team, and Venue are required.");
            return;
        }

        try {
            const response = await api.post(
                "/matches",
                {
                    date,
                    home_team_id: homeTeamId,
                    away_team_id: awayTeamId, // Correct capitalization
                    venue_id: venueId,
                    home_team_score: homeTeamScore, // Correct capitalization
                    away_team_score: awayTeamScore, // Correct capitalization
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            console.log("Match created successfully:", response.data);
            navigate("/matches");
        } catch (error) {
            console.error("Failed to create match:", error.response?.data || error.message);
            setError("Failed to create match.");
        }
    };


    return (
        <div>
            <Navbar />
            <div className="centered-container">
                <div className="centered-content">
                    <h2>Create New Match</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit} className="create-form">
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Home Team</label>
                            <select
                                value={homeTeamId}
                                onChange={(e) => setHomeTeamId(e.target.value)}
                                required
                            >
                                <option value="">Select Home Team</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Away Team</label>
                            <select
                                value={awayTeamId}
                                onChange={(e) => setAwayTeamId(e.target.value)}
                                required
                            >
                                <option value="">Select Away Team</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Venue</label>
                            <select
                                value={venueId}
                                onChange={(e) => setVenueId(e.target.value)}
                                required
                            >
                                <option value="">Select Venue</option>
                                {venues.map((venue) => (
                                    <option key={venue.id} value={venue.id}>
                                        {venue.name} ({venue.location})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Home Team Score</label>
                            <input
                                type="number"
                                value={homeTeamScore}
                                onChange={(e) => setHomeTeamScore(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Away Team Score</label>
                            <input
                                type="number"
                                value={awayTeamScore}
                                onChange={(e) => setAwayTeamScore(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="add-favorite-btn">Create Match</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateMatch;
