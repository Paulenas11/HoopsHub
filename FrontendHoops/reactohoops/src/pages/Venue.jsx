import React, { useState, useEffect } from "react";
import api from "../api"; // Axios instance
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../Content.css"; // Ensure the CSS file is imported

const Venues = () => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Get the role from localStorage
    const role = localStorage.getItem("role");

    // Fetch venues on component mount
    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await api.get("/venues"); // Fetch venues from the backend
                setVenues(response.data); // Set venues in state
                setLoading(false); // Stop loading
            } catch (error) {
                setError("Failed to fetch venues.");
                setLoading(false);
            }
        };

        fetchVenues();
    }, []);

    // Get the JWT token from localStorage
    const token = localStorage.getItem("access_token");

    // Handle delete (only if user is an admin)
    const handleDelete = async (venueId) => {
        if (role !== "administrator") {
            setError("You must be an administrator to delete a venue.");
            return;
        }

        try {
            if (!token) {
                setError("You must be logged in to delete a venue.");
                return;
            }

            // Include the Authorization header with the token
            await api.delete(`/venues/${venueId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token to the Authorization header
                },
            });

            setVenues(venues.filter((venue) => venue.id !== venueId)); // Remove the deleted venue from the list
        } catch (error) {
            console.error("Failed to delete venue:", error.response?.data || error.message);
            setError("Failed to delete venue. Please try again.");
        }
    };

    // Handle edit (only if user is an admin)
    const handleEdit = (venueId) => {
        if (role !== "administrator") {
            setError("You must be an administrator to edit a venue.");
            return;
        }

        // Redirect to the venue edit page
        navigate(`/edit-venue/${venueId}`);
    };

    const handleCreateVenue = () => {
        if (role === "administrator") {
            navigate("/create-venue");
        } else {
            setError("You must be an administrator to create a venue.");
        }
    };

    if (loading) {
        return <div>Loading venues...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="centered-container">
                <div className="centered-content">
                    <h2>Venues</h2>

                    {/* Create Venue button visible only to admins */}
                    {role === "administrator" && (
                        <button className="add-favorite-btn" onClick={handleCreateVenue}>Create Venue</button>
                    )}

                    <ul className="team-list">
                        {venues.map((venue) => (
                            <li key={venue.id} className="team-item">
                                <div className="team-info">
                                    <div className="team-details">
                                        <p><strong>Name:</strong> {venue.name}</p>
                                        <p><strong>Location:</strong> {venue.location}</p>
                                        {venue.capacity && <p><strong>Capacity:</strong> {venue.capacity}</p>}
                                        {venue.events && <p><strong>Events:</strong> {venue.events.join(", ")}</p>}
                                    </div>
                                    <div className="team-actions">
                                        {role === "administrator" && (
                                            <>
                                                <button className="favorite-btn" onClick={() => handleEdit(venue.id)}>Edit</button>
                                                <button className="remove-btn" onClick={() => handleDelete(venue.id)}>Delete</button>
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

export default Venues;
