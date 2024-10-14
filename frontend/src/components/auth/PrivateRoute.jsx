import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the path as necessary

const PrivateRoute = () => {
    const { token } = useAuth();
    // Check if the token exists and is valid
    if (!token) {
        return <Navigate to="/Login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;