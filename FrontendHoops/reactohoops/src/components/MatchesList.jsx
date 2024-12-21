import React, { useState } from "react";

const MatchesList = ({ matches, teams }) => {
    const [expandedMatches, setExpandedMatches] = useState({});

    const toggleMatchDetails = (matchId) => {
        setExpandedMatches((prev) => ({
            ...prev,
            [matchId]: !prev[matchId],
        }));
    };

    const getTeamName = (teamId) => {
        const team = teams.find((team) => team.id === teamId);
        return team ? team.name : "Unknown";
    };

    return (
        <div className="matches-container">
            {matches.map((match) => (
                <div key={match.id} className="match-item">
                    <div className="match-header" onClick={() => toggleMatchDetails(match.id)}>
                        <span>{match.time}</span>
                        <span>{getTeamName(match.home_team_id)}</span>
                        <span>vs</span>
                        <span>{getTeamName(match.away_team_id)}</span>
                        <span>{match.home_team_score || "-"}</span>
                        <span>{match.away_team_score || "-"}</span>
                        <button>{expandedMatches[match.id] ? "Hide Details" : "Show Details"}</button>
                    </div>
                    {expandedMatches[match.id] && (
                        <div className="match-details">
                            <p>Additional details for the match can go here.</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MatchesList;
