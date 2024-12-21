import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar component
import "../Content.css"; // Ensure the CSS file is imported

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const role = localStorage.getItem("role"); // Get the role from localStorage

    useEffect(() => {
        const fetchData = async () => {
            try {
                const matchesResponse = await api.get("/matches");
                setMatches(matchesResponse.data);
                console.log("Fetched matches:", matchesResponse.data);

                const teamsResponse = await api.get("/teams");
                setTeams(teamsResponse.data);
                console.log("Fetched teams:", teamsResponse.data);

                const venuesResponse = await api.get("/venues");
                setVenues(venuesResponse.data);
                console.log("Fetched venues:", venuesResponse.data);
            } catch (error) {
                setError("Failed to fetch data.");
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/matches/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            setMatches(matches.filter((match) => match.id !== id));
        } catch (error) {
            setError("Failed to delete match.");
        }
    };

    const getTeamName = (teamId) => {
        const team = teams.find((team) => team.id === teamId);
        return team ? team.name : "Unknown";
    };

    const getVenueName = (venueId) => {
        const venue = venues.find((venue) => venue.id === venueId);
        console.log(`Venue ID: ${venueId}, Venue Name: ${venue ? venue.name : "Unknown"}`);
        return venue ? venue.name : "Unknown";
    };

    return (
        <div>
            <Navbar />
            <div className="centered-container">
                <div className="centered-content">
                    <h2>Matches</h2>
                    {error && <p>{error}</p>}

                    {role === "administrator" && (
                        <div style={{ marginBottom: "20px" }}>
                            <button className="add-favorite-btn" onClick={() => navigate("/create-match")}>Create New Match</button>
                        </div>
                    )}

                    <table className="matches-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Home Team</th>
                                <th>Away Team</th>
                                <th>Venue</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.map((match) => (
                                <tr key={match.id}>
                                    <td>{match.date}</td>
                                    <td>{getTeamName(match.home_team_id)}</td>
                                    <td>{getTeamName(match.away_team_id)}</td>
                                    <td>{getVenueName(match.venue_id)}</td>
                                    <td>
                                        {role === "administrator" && (
                                            <>
                                                <button className="favorite-btn" onClick={() => navigate(`/edit-match/${match.id}`)}>Edit</button>
                                                <button className="remove-btn" onClick={() => handleDelete(match.id)}>Delete</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Matches;
