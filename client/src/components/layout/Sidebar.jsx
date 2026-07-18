import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";


export default function Sidebar() {


    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();



    const handleLogout = () => {

        logout();

        navigate("/login");

    };



    return (

        <aside className="sidebar">


            <div className="sidebar-header">

                <h2>
                    Ticket QR
                </h2>

            </div>



            <nav className="sidebar-nav">


                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>


                <NavLink to="/tickets">
                    Tickets
                </NavLink>


                <NavLink to="/scanner">
                    Scanner
                </NavLink>


                <NavLink to="/profile">
                    Profile
                </NavLink>


            </nav>



            <button
                className="logout-btn"
                onClick={handleLogout}
            >

                Logout

            </button>



        </aside>

    );

}