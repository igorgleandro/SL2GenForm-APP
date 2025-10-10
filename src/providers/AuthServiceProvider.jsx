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

                applyTheme(userData.theme || 'system');
            } catch (error) {
                console.error('Error parsing saved user data:', error);
                clearAuthData();
            }
        } else {
            applyTheme('system');
        }
    }, []);


    const applyTheme = (themePreference) => {
        if (themePreference === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', themePreference.toLowerCase());
        }
    };

    const clearAuthData = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        localStorage.removeItem('userId');
    };

    const login = (userData) => {
        console.log('Logging in user:', userData);
        setIsLoggedIn(true);
        setUserId(userData.id || userData.email);
        setUser(userData);

        // Persist to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userId', userData.id || userData.email);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('tokenType', userData.tokenType || 'Bearer');


        applyTheme(userData.theme || 'system');

        console.log("User logged in and data persisted:", userData);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserId(null);
        setUser(null);
        clearAuthData();

        applyTheme('system');

        console.log("User logged out and data cleared");
    };

       const updateUser = async (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Apply theme if it was updated
        if (updates.theme) {
            applyTheme(updates.theme);
        }

        return updatedUser;
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userId,
            user,
            login,
            logout,
            updateUser  // Add this for SettingsPage
        }}>
            {children}
        </AuthContext.Provider>
    );
}