import { Outlet } from "react-router-dom";
import SidebarNav from "./SidebarNav";
import { HeaderBar } from "./HeaderBar.jsx";

export default function DefaultLayout() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 md:grid md:grid-cols-[16rem_1fr] overflow-y-auto">
            <SidebarNav />
            <div className="flex flex-col overflow-y-auto">
                <HeaderBar />
                <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}