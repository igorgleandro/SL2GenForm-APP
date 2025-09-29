import { useAuth } from '../providers/AuthServiceProvider';
import { useNavigate } from 'react-router-dom';
import { LogOut, LogIn } from 'lucide-react';

export default function AuthButton() {
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    if (isLoggedIn) {
        return (
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    {user?.username}
                </span>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleLogin}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors"
        >
            <LogIn className="w-4 h-4" />
            Login
        </button>
    );
}