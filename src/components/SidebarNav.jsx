import { NavLink } from "react-router-dom";
import { Home, FileText, Info, Phone } from "lucide-react";
import Typography from "@mui/material/Typography";
import * as React from "react";

const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/myforms", label: "MyForms", icon: FileText },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: Phone },
];

export default function SidebarNav() {
    return (
        <aside className="min-h-screen w-64 bg-gradient-to-b from-emerald-600 to-teal-700 text-white p-4">
            {/* user */}
            <div className="flex items-center gap-3 mb-6">
                <img
                    className="w-10 h-10 rounded-full ring-2 ring-white/30"
                    src="src/assets/images/avatar.png"
                    alt="avatar"
                />
                <div>
                    <p className="text-sm font-semibold">Igor Gomes</p>
                    <p className="text-xs text-white/75">manager</p>
                </div>
            </div>

            {/* nav */}
            <nav className="space-y-1 text-sm">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === "/"} // ensures Home only activates on exact path
                        className={({ isActive }) =>
                            [
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-left",
                                isActive ? "bg-white text-emerald-700" : "hover:bg-white/10",
                            ].join(" ")
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon
                                    className={isActive ? "w-4 h-4 text-emerald-700" : "w-4 h-4 text-white"}
                                />
                                <span className={isActive ? "font-semibold" : "text-white/90"}>{label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
