import React, { useState } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar component
import "../Content.css"; // Import the CSS file for styling

const CreateVenue = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Log the data being sent
        console.log("Submitting data:", { name, location, capacity });

        if (!name || !location || !capacity) {
            setError("Name, Location, and Capacity are required.");
            return;
        }

        try {
            const response = await api.post(
                "/venues",
                { name, location, capacity },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            console.log("Venue created successfully:", response.data);
            navigate("/venues");
        } catch (error) {
            console.error("Failed to create venue:", error.response?.data || error.message);
            setError("Failed to create venue.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="centered-container">
                <div className="centered-content">
                    <h2>Create New Venue</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit} className="create-form">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Capacity</label>
                            <input
                                type="number"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="add-favorite-btn">Create Venue</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateVenue;
