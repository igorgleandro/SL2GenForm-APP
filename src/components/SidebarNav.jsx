import { NavLink } from "react-router-dom";
import { Home, FileText, Info, Phone, Settings, Menu, X } from "lucide-react";
import * as React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../providers/AuthServiceProvider.jsx";

const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/myforms", label: "MyForms", icon: FileText },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: Phone },
    { to: "/settings", label: "Settings", icon: Settings},
];

export default function SidebarNav() {
    const { user, isLoggedIn } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-emerald-600 text-white shadow-lg md:hidden hover:bg-emerald-700 transition-colors"
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}


            <aside
                className={`
                    fixed md:sticky top-0 left-0 z-40
                    min-h-screen w-64 
                    bg-gradient-to-b from-emerald-600 to-teal-700 
                    dark:from-emerald-900 dark:to-teal-900 
                    text-white p-5 
                    dark:border-r dark:border-emerald-800/30
                    transform transition-transform duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >

                {/* User Profile Section */}
                {isLoggedIn && user ? (
                    <Link
                        to="/profile"
                        className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity mt-12 md:mt-0"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <img
                            className="w-10 h-10 rounded-full ring-2 ring-white/30 dark:ring-emerald-400/30"
                            src={user.avatar || "/images/avatarGuest.png"}
                            alt="avatar"
                        />
                        <div>
                            <p className="text-sm font-semibold text-white dark:text-emerald-100">
                                {user.name || user.email || "User"}
                            </p>
                            <p className="text-xs text-white/75 dark:text-emerald-300/75">
                                {user.role || " "}
                            </p>
                        </div>
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity mt-12 md:mt-0"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <img
                            className="w-10 h-10 rounded-full ring-2 ring-white/30 dark:ring-emerald-400/30"
                            src="../../images/avatarGuest.png"
                            alt="avatar"
                        />
                        <div>
                            <p className="text-sm font-semibold text-white dark:text-emerald-100">Guest</p>
                            <p className="text-xs text-white/75 dark:text-emerald-300/75">Not logged in</p>
                        </div>
                    </Link>
                )}

                {/* Navigation */}
                <nav className="space-y-1 text-sm">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                [
                                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-left",
                                    isActive
                                        ? "bg-white text-emerald-700 dark:bg-emerald-800 dark:text-emerald-100 dark:ring-1 dark:ring-emerald-600/50"
                                        : "hover:bg-white/10 dark:hover:bg-emerald-800/40",
                                ].join(" ")
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        className={isActive
                                            ? "w-4 h-4 text-emerald-700 dark:text-emerald-200"
                                            : "w-4 h-4 text-white dark:text-emerald-300"
                                        }
                                    />
                                    <span className={isActive
                                        ? "font-semibold dark:text-emerald-100"
                                        : "text-white/90 dark:text-emerald-200/90"
                                    }>{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}