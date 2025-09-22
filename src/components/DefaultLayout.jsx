// DefaultLayout.jsx
import { Outlet } from "react-router-dom";
import SidebarNav from "./SidebarNav";
import { Topbar } from "./Topbar";

export default function DefaultLayout() {
    return (
        <div className="min-h-screen bg-gray-50 grid grid-cols-[16rem_1fr]">
            {/* Left: Sidebar */}
            <SidebarNav />

            {/* Right: Topbar + page content */}
            <div className="flex min-h-screen flex-col">
                <Topbar />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
