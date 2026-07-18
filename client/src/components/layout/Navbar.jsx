import { useContext } from "react";

import {
    AuthContext
} from "../../context/AuthContext";


export default function Navbar(){

    const {
        user
    } = useContext(AuthContext);



    return (

        <header className="navbar">


            <h3>
                Dashboard
            </h3>



            <div className="navbar-user">

                {
                    user?.name
                }

            </div>


        </header>

    );

}