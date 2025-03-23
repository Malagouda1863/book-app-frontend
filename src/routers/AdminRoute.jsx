import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    // Check JWT token for admin role
    let tokenUser = null;
    try {
        if (token) {
            tokenUser = JSON.parse(atob(token.split('.')[1]));
        }
    } catch (error) {
        console.error("Error parsing token:", error);
        // If token can't be parsed, consider it invalid
    }

    // Check if the user is an admin
    if (tokenUser?.role === 'admin') {
        return children;
    }

    // If no valid admin credentials found, redirect
    return <Navigate to="/" replace />;
};

export default AdminRoute;