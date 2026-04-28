import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login, but save the current location to return to after login
        const returnTo = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/login?returnTo=${returnTo}`} replace />;
    }

    return children;
};

export default ProtectedRoute;
