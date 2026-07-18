import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Tickets from "../pages/Tickets";
import Scanner from "../pages/Scanner";
import Profile from "../pages/Profile";

import ProtectedRoute from "./ProtectedRoute";


export default function AppRoutes(){

    return (

        <Routes>

            <Route
                path="/register"
                element={<Register />}
            />


            <Route
                path="/login"
                element={<Login />}
            />


            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />


            <Route
                path="/tickets"
                element={
                    <ProtectedRoute>
                        <Tickets />
                    </ProtectedRoute>
                }
            />


            <Route
                path="/scanner"
                element={
                    <ProtectedRoute>
                        <Scanner />
                    </ProtectedRoute>
                }
            />


            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />


        </Routes>

    );

}