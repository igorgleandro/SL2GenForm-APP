import { Outlet } from "react-router-dom";
import SidebarNav from "./SidebarNav";
//import {Topbar} from "./Topbar";


export default function DefaultLayout() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 grid grid-cols-[16rem_1fr]">
            <SidebarNav />
            <div className="flex min-h-screen flex-col">

                <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
