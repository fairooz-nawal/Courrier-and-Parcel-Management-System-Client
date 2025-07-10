import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
export const ContextAPI = createContext();

// Provider component
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // stores logged-in user info
    const [loading, setLoading] = useState(true); // track loading state

    // Check token on app load (like Firebase observer)
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
            // Optional: verify token with backend
            axios
                .get("http://localhost:5000/api/verify-token", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    if (res.data.valid) {
                        setUser(JSON.parse(storedUser));
                    } else {
                        // Token invalid or expired
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        setUser(null);
                    }
                })
                .catch((err) => {
                    console.error("Token verification failed", err);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false); // No user in localStorage
        }
    }, []);

    // Login method
    const login = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    // Logout method
    const logout = () => {
        localStorage.removeItem("token"); // Remove JWT token
        localStorage.removeItem("user");  // Remove user info
        setUser(null); // Reset user state
    };

    console.log("This is contextAPI", user);

    return (
        <ContextAPI.Provider value={{ user, login, logout, loading }}>
            {children}
        </ContextAPI.Provider>
    );
};

export default AuthProvider;
