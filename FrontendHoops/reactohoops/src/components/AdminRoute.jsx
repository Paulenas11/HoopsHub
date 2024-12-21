import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const role = localStorage.getItem("role");

    return role === "administrator" ? children : <Navigate to="/" />; // Redirect to home page if not an administrator
};

export default AdminRoute;
