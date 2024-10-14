import React from 'react';
import { useAuth } from '../../Components/auth/AuthContext'; // Adjust the path as necessary

const NavbarPage = () => {
    // const { logout } = useAuth();
    const { username, logout } = useAuth();

    const handleLogout = () => {
        logout();
        // Optionally, redirect to the login page or home page
        window.location.href = '/Login';
    };

    return (
        <nav className="bg-gray-800 p-4 w-full fixed top-0 left-0">
            <ul className="flex justify-between items-center">
                <div className="flex space-x-4">
                    <li className="navbar-item">
                        <a href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/about" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/contact" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                    </li>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-white text-sm font-medium">{username}</span>
                    <li className="navbar-item">
                        <button onClick={handleLogout} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default NavbarPage;