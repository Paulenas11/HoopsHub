import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
    const role = localStorage.getItem("role");

    // Allow guests, members, and admins to access this route
    if (!role || role === "guest" || role === "member" || role === "administrator") {
        return children;
    }

    return <Navigate to="/login" />;
};

export default GuestRoute;
