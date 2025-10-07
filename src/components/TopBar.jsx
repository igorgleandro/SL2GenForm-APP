import { Search } from "lucide-react";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import * as React from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import {useAuth} from "../providers/AuthServiceProvider.jsx";
import AuthButton from "../logic/LogInInfo.jsx";


export function Topbar() {

    //const { isLoggedIn, user, logout } = useAuth();

    return (
        <div className="flex items-center justify-between px-5 py-4 border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <DocumentScannerIcon
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        mr: 1,
                        color: 'inherit'
                    }}
                    className="text-gray-700 dark:text-gray-300"
                />
                <Typography
                    variant="h6"
                    noWrap
                    component={NavLink}
                    to="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        textDecoration: 'none',
                    }}
                    className="text-black dark:text-white"
                >
                    SL2GEN
                </Typography>
            </div>
            <div className="flex items-center gap-2">


                <ThemeToggle/>

                <AuthButton />
            </div>
        </div>
    );
}
