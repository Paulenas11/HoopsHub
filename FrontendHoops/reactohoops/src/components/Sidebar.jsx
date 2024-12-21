import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api"; // Axios instance
import "../Content.css"; // Ensure the CSS file is imported

const Sidebar = () => {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // New state for admin

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const role = localStorage.getItem("role");
        if (token) {
            setIsAuthenticated(true);
            if (role === "administrator") {
                setIsAdmin(true); // Set admin state
            }
            const fetchFavorites = async () => {
                try {
                    const response = await api.get('/favorite-teams', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setFavorites(response.data);
                } catch (error) {
                    setError("Failed to fetch favorite teams.");
                }
            };

            fetchFavorites();
        }
    }, []);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
            <div className="sidebar">
                <h3>Favorite Teams</h3>
                {isAuthenticated && favorites.length === 0 ? (
                    <Link to="/favorites">
                        <button className="add-favorite-btn">Add a Team</button>
                    </Link>
                ) : (
                    <ul className="favorite-list">
                        {favorites.map(team => (
                            <li key={team.id} className="favorite-item">{team.name}</li>
                        ))}
                    </ul>
                )}
                {!isAuthenticated && (
                    <p>Please <a href="/login">log in</a> to view and add favorite teams.</p>
                )}
            </div>
    );
};

export default Sidebar;
