import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageComponent from './ImageComponent';
import "../Header.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const role = localStorage.getItem("role");

        if (token) {
            setIsLoggedIn(true);
            if (role === "administrator") {
                setIsAdmin(true);
            }
        }
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        navigate("/login");
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    return (
        <header className="header">
            <div className="left-section">
                <ImageComponent className="header-logo" alt="Logo" />
            </div>
            <div className="center-section">
                <Link to="/" className="hoops-hub-link"><h1>Hoops Hub</h1></Link>
            </div>
            <div className="right-section">
                <nav className={menuOpen ? "show" : ""}>
                    <Link to="/">Home</Link>
                    {isLoggedIn ? (
                        <>
                            {isAdmin && <Link to="/admin-dashboard">Admin Dashboard</Link>}
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </nav>
                <div className="hamburger" onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
