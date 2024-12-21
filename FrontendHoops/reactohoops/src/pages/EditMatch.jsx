import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar component
import "../Content.css"; // Import the CSS file for styling

const EditMatch = () => {
    const { matchId } = useParams();
    const [match, setMatch] = useState({ date: "", home_team_id: "", away_team_id: "", venue_id: "", home_team_score: "", away_team_score: "" });
    const [teams, setTeams] = useState([]);
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const response = await api.get(`/matches/${matchId}`);
                setMatch(response.data);
            } catch (error) {
                setError("Failed to fetch match details.");
            }
        };

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

        fetchMatch();
        fetchTeams();
        fetchVenues();
    }, [matchId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.put(
                `/matches/${matchId}`,
                {
                    date: match.date,
                    home_team_id: match.home_team_id,
                    away_team_id: match.away_team_id,
                    venue_id: match.venue_id,
                    home_team_score: match.home_team_score,
                    away_team_score: match.away_team_score
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            navigate("/matches");
        } catch (error) {
            setError("Failed to update match.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="centered-container">
                <div className="centered-content">
                    <h2>Edit Match</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit} className="create-form">
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="date"
                                value={match.date}
                                onChange={(e) => setMatch({ ...match, date: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Home Team</label>
                            <select
                                value={match.home_team_id}
                                onChange={(e) => setMatch({ ...match, home_team_id: e.target.value })}
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
                                value={match.away_team_id}
                                onChange={(e) => setMatch({ ...match, away_team_id: e.target.value })}
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
                                value={match.venue_id}
                                onChange={(e) => setMatch({ ...match, venue_id: e.target.value })}
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
                                value={match.home_team_score}
                                onChange={(e) => setMatch({ ...match, home_team_score: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Away Team Score</label>
                            <input
                                type="number"
                                value={match.away_team_score}
                                onChange={(e) => setMatch({ ...match, away_team_score: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="add-favorite-btn">Update Match</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditMatch;
