import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar component
import '../Content.css'; // Import the CSS file for styling

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "administrator") {
            setIsAdmin(true);
        } else {
            navigate("/"); // Redirect non-admin users to the home page
        }
    }, [navigate]);

    const handleLogout = () => {
        navigate("/logout"); // Navigate to the Logout route
    };

    if (!isAdmin) {
        return null; // Prevent rendering for non-admin users
    }

    return (
        <div>
            <div className="centered-container">
                <div className="centered-content">
                    <h1>Admin Dashboard</h1>
                    <div className="admin-links team-list">
                        <Link to="/teams" className="team-item">
                            <div className="team-info">
                                <div className="team-names">
                                    <span className="team-name">Manage Teams</span>
                                </div>
                            </div>
                        </Link>
                        <Link to="/venues" className="team-item">
                            <div className="team-info">
                                <div className="team-names">
                                    <span className="team-name">Manage Venues</span>
                                </div>
                            </div>
                        </Link>
                        <Link to="/matches" className="team-item">
                            <div className="team-info">
                                <div className="team-names">
                                    <span className="team-name">Manage Matches</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <button className="add-favorite-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
