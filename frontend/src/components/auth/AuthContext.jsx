import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // Retrieve the token and username from localStorage or any other storage
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        setToken(storedToken);
        setUsername(storedUsername);
    }, []);

    const login = (newToken, newUsername) => {
        setToken(newToken);
        setUsername(newUsername);
        localStorage.setItem('token', newToken);
        localStorage.setItem('username', newUsername);
    };

    const logout = () => {
        setToken(null);
        setUsername(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    const value = {
        token,
        username,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};