import {createContext, useContext, useState} from "react";

// Move these OUTSIDE the component
const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUserId(userData.id || userData.email);
        setUser(userData);
        console.log(userData);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserId(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}