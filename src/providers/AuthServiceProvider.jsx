import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return !!localStorage.getItem('token');
    });

    const [userId, setUserId] = useState(() => {
        return localStorage.getItem('userId') || null;
    });

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        const savedUserId = localStorage.getItem('userId');

        if (token && savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
                setUserId(savedUserId || userData.id);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Error parsing saved user data:', error);
                // Clear corrupted data
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('tokenType');
                localStorage.removeItem('userId');
            }
        }
    }, []);


    const login = (userData) => {

        console.log(userData);
        setIsLoggedIn(true);
        setUserId(userData.id || userData.email);
        setUser(userData);

// Persist to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userId', userData.id || userData.email);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('tokenType', userData.tokenType || 'Bearer');

        console.log("User logged in and data persisted:", userData);
    };



    const logout = () => {
        setIsLoggedIn(false);
        setUserId(null);
        setUser(null);

        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');

        console.log("User logged out and data cleared");

    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}