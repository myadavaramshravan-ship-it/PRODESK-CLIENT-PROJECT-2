import { createContext, useState } from "react";

export const AuthContext = createContext();


export default function AuthProvider({ children }) {


    const [user, setUser] = useState(() => {

        try {

            const savedUser = localStorage.getItem("user");


            if (
                !savedUser ||
                savedUser === "undefined" ||
                savedUser === "null"
            ) {
                return null;
            }


            return JSON.parse(savedUser);


        } catch (error) {

            localStorage.removeItem("user");

            return null;

        }

    });



    const login = (data) => {


        setUser(data.user);


        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );


        if (data.token) {

            localStorage.setItem(
                "token",
                data.token
            );

        }

    };



    const logout = () => {


        setUser(null);


        localStorage.removeItem("user");


        localStorage.removeItem("token");


    };



    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}