import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from "../providers/AuthServiceProvider.jsx";
import { User, Mail, Shield, Hash, Image as ImageIcon, Settings, LogOut } from 'lucide-react';

function ProfilePage() {
    const navigate = useNavigate();
    const { user, isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isLoggedIn || !user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-6">
                    <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800"></div>

                    <div className="px-6 pb-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16">
                            {/* Avatar */}
                            <div className="relative">
                                <img
                                    src={user.avatar || '/images/avatarGuest.png'}
                                    alt={`${user.name}'s avatar`}
                                    className="w-32 h-32 rounded-full ring-4 ring-white dark:ring-gray-800 object-cover bg-white dark:bg-gray-700"
                                    onError={(e) => {
                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                                    }}
                                />
                                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full ring-4 ring-white dark:ring-gray-800 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">✓</span>
                                </div>
                            </div>

                            {/* Name and Actions */}
                            <div className="flex-1 text-center sm:text-left">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {user.name} {user.surname}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    {user.email}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate('/settings')}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-lg transition-colors"
                                >
                                    <Settings className="w-4 h-4" />
                                    Edit Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            Personal Information
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    <Hash className="w-4 h-4" />
                                    User ID
                                </label>
                                <p className="mt-1 text-lg text-gray-900 dark:text-white font-mono">
                                    {user.id}
                                </p>
                            </div>

                            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    First Name
                                </label>
                                <p className="mt-1 text-lg text-gray-900 dark:text-white">
                                    {user.name || '—'}
                                </p>
                            </div>

                            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Surname
                                </label>
                                <p className="mt-1 text-lg text-gray-900 dark:text-white">
                                    {user.surname || '—'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Account Details */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            Account Details
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email Address
                                </label>
                                <p className="mt-1 text-lg text-gray-900 dark:text-white break-all">
                                    {user.email}
                                </p>
                            </div>

                            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    Role
                                </label>
                                <div className="mt-2">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                        user.role === 'ADMIN' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                                            user.role === 'MANAGER' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                                                user.role === 'DEVELOPER' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                    }`}>
                                        {user.role || 'USER'}
                                    </span>
                                </div>
                            </div>

                            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    Avatar
                                </label>
                                <div className="mt-2 flex items-center gap-3">
                                    <img
                                        src={user.avatar || '/images/avatarGuest.png'}
                                        alt="Current avatar"
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                                        onError={(e) => {
                                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                                        }}
                                    />
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {user.avatar ? 'Custom avatar' : 'Default avatar'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                                {/* Info Message */}
                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Note:</strong> To update your profile information, please visit the Settings page by clicking the "Edit Profile" button above.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;