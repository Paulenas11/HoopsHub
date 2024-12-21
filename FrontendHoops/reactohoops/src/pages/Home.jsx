import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api";
import "../Content.css";

const Home = () => {
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [matchesResponse, teamsResponse] = await Promise.all([
                    api.get("/matches"),
                    api.get("/teams"),
                ]);
                setMatches(matchesResponse.data);
                setTeams(teamsResponse.data);
            } catch (err) {
                setError("Could not load matches and teams. Please try again later.");
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    };

    const getTeamName = (teamId) => {
        const team = teams.find(team => team.id === teamId);
        return team ? team.name : "Unknown";
    };

    const filteredMatches = matches.filter(match => {
        const matchDate = new Date(match.date).toISOString().split("T")[0];
        return matchDate === selectedDate;
    });

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className="main-container">
                <Sidebar />
                <div className="centered-content">
                    <h1>Basketball Game Results</h1>
                    {error && <p className="error-message">{error}</p>}
                    <div>
                        <label>Select a date: </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            min={new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split("T")[0]}
                            max={new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]}
                        />
                    </div>
                    <div className="matches-container">
                        {filteredMatches.length > 0 ? (
                            filteredMatches.map((match) => (
                                <div key={match.id} className="match-card">
                                    <div className="match-info">
                                        <div className="team-names">
                                            <span className="team-name">{getTeamName(match.home_team_id)}</span>
                                            <span className="team-name">{getTeamName(match.away_team_id)}</span>
                                        </div>
                                        <div className="team-scores">
                                            <span className="team-score">{match.home_team_score || "-"}</span>
                                            <span className="team-score">{match.away_team_score || "-"}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No matches found for the selected date.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
