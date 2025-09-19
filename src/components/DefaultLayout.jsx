import { Outlet } from "react-router";
import NavBar from "./NavBar.jsx"


const DefaultLayout = () => {
    return (
        <div>
            <NavBar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default DefaultLayout;