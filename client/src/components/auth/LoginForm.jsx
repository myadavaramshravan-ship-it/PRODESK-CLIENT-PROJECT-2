import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";


export default function LoginForm(){

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [error,setError] = useState("");



    const handleLogin = async(e)=>{

        e.preventDefault();

        setError("");


        try{


            const res = await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );



            login(
                res.data.user,
                res.data.token
            );



            navigate("/dashboard");


        }
        catch(err){

            setError(
                err.response?.data?.message ||
                "Login failed"
            );

        }

    };



    return (

        <div className="auth-page">


            <div className="auth-card">


                <div className="auth-header">


                    <h1>
                        Ticket QR
                    </h1>


                    <p>
                        Login to manage your tickets
                    </p>


                </div>



                {
                    error &&

                    <div className="auth-error">

                        {error}

                    </div>

                }



                <form onSubmit={handleLogin}>


                    <div className="input-group">

                        <label>
                            Email
                        </label>


                        <input

                            type="email"

                            placeholder="Enter email"

                            value={email}

                            onChange={
                                (e)=>setEmail(e.target.value)
                            }

                            required

                        />

                    </div>




                    <div className="input-group">


                        <label>
                            Password
                        </label>


                        <input

                            type="password"

                            placeholder="Enter password"

                            value={password}

                            onChange={
                                (e)=>setPassword(e.target.value)
                            }

                            required

                        />


                    </div>




                    <button className="auth-btn">

                        Login

                    </button>



                </form>



                <p className="auth-footer">

                    Don't have an account?

                    <span
                        onClick={()=>{
                            navigate("/register")
                        }}
                    >
                        Register
                    </span>

                </p>



            </div>


        </div>

    );

}