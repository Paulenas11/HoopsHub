import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Content.css"; // Import the stylesheet

const Navbar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role"); // Retrieve role from localStorage

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/login");
    };

    const handleDashboardRedirect = () => {
        if (role === "administrator") {
            navigate("/admin-dashboard");
        } else if (role === "member") {
            navigate("/member-dashboard");
        } else {
            navigate("/guest-dashboard");
        }
    };

    return (
        <div className="navbar">
            <Link to="/favorites" className="nav-link">Favorites</Link>
            <Link to="/teams" className="nav-link">Teams</Link>
            <Link to="/venues" className="nav-link">Venues</Link>
        </div>
    );
};

export default Navbar;
