import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar component
import "../Content.css"; // Import the CSS file for styling

const EditVenue = () => {
    const { venueId } = useParams();
    const [venue, setVenue] = useState({ name: "", location: "", capacity: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const response = await api.get(`/venues/${venueId}`);
                setVenue(response.data);
            } catch (error) {
                setError("Failed to fetch venue details.");
            }
        };

        fetchVenue();
    }, [venueId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.put(
                `/venues/${venueId}`,
                { name: venue.name, location: venue.location, capacity: venue.capacity },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            navigate("/venues");
        } catch (error) {
            setError("Failed to update venue.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="centered-container">
                <div className="centered-content">
                    <h2>Edit Venue</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit} className="create-form">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={venue.name}
                                onChange={(e) => setVenue({ ...venue, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                value={venue.location}
                                onChange={(e) => setVenue({ ...venue, location: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Capacity</label>
                            <input
                                type="number"
                                value={venue.capacity}
                                onChange={(e) => setVenue({ ...venue, capacity: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="add-favorite-btn">Update Venue</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditVenue;
