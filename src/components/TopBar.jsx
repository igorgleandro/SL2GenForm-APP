import { Search, Bell, HelpCircle } from "lucide-react";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import * as React from "react";
import ThemeToggle from "./ThemeToggle.jsx";

export function Topbar() {
    return (
        <div className="flex items-center justify-between px-5 py-4 border-b bg-white">
            <div className="flex items-center gap-3 text-sm text-gray-500">
                <DocumentScannerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
                        color: 'black',
                        textDecoration: 'none',
                    }}
                >
                    SL2GEN
                </Typography>
            </div>
            <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-gray-500">
                    <Search className="w-4 h-4" />
                    <input className="outline-none placeholder:text-gray-400 w-40" placeholder="Search" />
                </div>




                    <ThemeToggle/>

                <button className="px-3 py-1.5 rounded-full border text-sm">Logout</button>
            </div>
        </div>
    );
}
