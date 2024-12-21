import React from "react";
import { Navigate } from "react-router-dom";

const MemberRoute = ({ children }) => {
    const role = localStorage.getItem("role");

    if (role === "member" || role === "administrator") {
        return children;
    } else {
        return <Navigate to="/" />; // Redirect to home page if not a member or administrator
    }
};

export default MemberRoute;
