import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";


export default function Sidebar(){

    const { logout } = useContext(AuthContext);


    return (

        <aside className="sidebar">


            <div className="sidebar-logo">

                Ticket QR

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
                onClick={logout}
            >

                Logout

            </button>


        </aside>

    );

}