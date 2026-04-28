import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, isAdmin, loadingAuth } = useAuth();
    const location = useLocation();

    if (loadingAuth) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        // Redirect to admin login if not logged in
        return <Navigate to="/admin-login" state={{ from: location }} replace />;
    }

    if (!isAdmin) {
        // Redirect to home if logged in but not an admin
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
