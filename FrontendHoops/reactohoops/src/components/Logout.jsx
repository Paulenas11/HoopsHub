import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Using useNavigate for routing
import api from "../api"; // Axios instance

const Logout = () => {
    const [isLoggedOut, setIsLoggedOut] = useState(false); // Track logout state
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        logoutUser();
    }, []);

    const logoutUser = async () => {
        try {
            // Make an API call to the logout endpoint
            await api.post("/logout", {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            // Clear tokens and user information from localStorage
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("username");
            localStorage.removeItem("role");

            console.log("User logged out successfully.");

            // Mark the user as logged out and trigger re-render
            setIsLoggedOut(true);
            navigate("/");  // Redirect to home
        } catch (error) {
            console.error("Failed to logout:", error.response?.data || error.message);
        }
    };

    // If logout is successful, force UI update on the homepage by checking isLoggedOut state
    useEffect(() => {
        if (isLoggedOut) {
            // Force re-render on homepage by setting a state or clearing any user-related data in UI
            window.location.reload();  // Optional: triggers a full page reload to reset state
        }
    }, [isLoggedOut]);

    return null; // No UI to render, just triggers the logout effect
};

export default Logout;
