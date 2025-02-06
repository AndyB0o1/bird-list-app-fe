import React from 'react';
import AuthService from '../../services/auth/AuthService';


export default function Logout() {
    const handleLogout = () => {
        AuthService.logout();
        alert('User logged out successfully');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};
