import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import api from "../api"; // Axios instance
import Navbar from "../components/Navbar";
import "../Content.css"; // Ensure the CSS file for Content is imported

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [allTeams, setAllTeams] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setIsAuthenticated(true);

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

            const fetchAllTeams = async () => {
                try {
                    const response = await api.get('/teams', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setAllTeams(response.data);
                    setFilteredTeams(response.data); // Initially set filtered teams to all teams
                } catch (error) {
                    setError("Failed to fetch teams.");
                }
            };

            fetchFavorites();
            fetchAllTeams();
        }
    }, []);

    const addFavorite = async (teamId) => {
        try {
            const response = await api.post('/favorite-teams', {
                team_id: teamId,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            setFavorites([...favorites, response.data]);
        } catch (error) {
            setError("Failed to add favorite team.");
        }
    };

    const removeFavorite = async (teamId) => {
        try {
            await api.delete(`/favorite-teams/${teamId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            setFavorites(favorites.filter(favorite => favorite.id !== teamId));
        } catch (error) {
            setError("Failed to remove favorite team.");
        }
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
        setFilteredTeams(allTeams.filter(team => team.name.toLowerCase().includes(searchTerm.toLowerCase())));
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!isAuthenticated) {
        return (
            <div>
                <Navbar />
                <div className="centered-container">
                    <div className="centered-content">
                        <h2>Favorites</h2>
                        <p>Please <a href="/login">log in</a> to add or view your favorite teams.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="centered-container">
                <div className="centered-content">
                    <h2>Favorite Teams</h2>
                    <button className="add-favorite-btn" onClick={() => setShowModal(true)}>Add a Favorite</button>
                    <Modal show={showModal} onClose={() => setShowModal(false)}>
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Search teams..."
                            value={search}
                            onChange={handleSearch}
                        />
                        <div className="modal-content">
                            <ul>
                                {filteredTeams.map(team => (
                                    <li key={team.id} className="team-item">
                                        <span className="team-name">{team.name} - {team.city}</span>
                                        <button
                                            className="add-favorite-btn"
                                            onClick={() => addFavorite(team.id)}
                                        >
                                            Add to Favorites
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Modal>
                    <h3>Your Favorite Teams</h3>
                    <ul className="favorite-list">
                        {favorites.map((item) => (
                            <li key={item.id} className="favorite-item">
                                <div className="favorite-info">
                                    <p><strong>Name:</strong> {item.name}</p>
                                    {item.city && <p><strong>City:</strong> {item.city}</p>}
                                    {item.position && <p><strong>Position:</strong> {item.position}</p>}
                                </div>
                                <div className="favorite-actions">
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFavorite(item.id)}
                                    >
                                        Remove from Favorites
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Favorites;
