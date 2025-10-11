import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import * as React from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import AuthButton from "../logic/LogInInfo.jsx";

export function HeaderBar() {
    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
            <div className="flex items-center justify-between px-6 py-3.5 max-w-screen-2xl mx-auto">
                {/* Logo and Brand Section */}
                <NavLink
                    to="/"
                    className="flex items-center gap-3 group transition-all hover:opacity-80"
                >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md group-hover:shadow-lg transition-shadow">
                        <DocumentScannerIcon
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                fontSize: 28
                            }}
                            className="text-white"
                        />
                    </div>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            letterSpacing: '.25rem',
                            textDecoration: 'none',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        SL2GEN
                    </Typography>
                </NavLink>

                {/* Actions Section */}
                <div className="flex items-center gap-3">
                    <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block" />

                    <ThemeToggle />

                    <AuthButton />
                </div>
            </div>
        </header>
    );
}