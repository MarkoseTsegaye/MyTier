import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import React from 'react';
import { useAuth } from './AuthContext';

function Login({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post("/api/token/", { username, password });
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            login({ username });
            navigate("/collection/all");
        } catch (error) {
            alert(error);
        } finally {
            console.log("Login Success");
        }
    };

    const handleRegister = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post("/api/user/register/", { username, password });
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/login");
        } catch (error) {
            alert(error);
        } finally {
            console.log("Register Success");
        }
    };

    return (
        <div className="flex w-screen h-screen">
            <div className="hidden md:flex w-1/2 h-screen bg-gradient-to-r from-gray-800 to-gray-900 items-center justify-center">
                <div className="text-center text-white">
                    <img src='/material-layout-stack-svgrepo-com.svg' width={150} alt="Logo" className="mx-auto mb-4" />
                    <h1 className="text-5xl font-bold mb-2">Welcome to MyTier</h1>
                    <p className="text-lg">Organize your collections effortlessly</p>
                </div>
            </div>
            <div className="w-full md:w-1/2 h-screen bg-gray-800 flex items-center justify-center">
                <form className="flex w-3/4 h-max flex-col">
                    <h1 className="text-3xl text-white font-bold mb-6 text-center">Login</h1>
                    <input
                        className="form-input w-full rounded-md h-14 mb-4 p-4 border border-gray-600 bg-gray-700 text-white"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        className="form-input w-full rounded-md h-14 mb-4 p-4 border border-gray-600 bg-gray-700 text-white"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button className="form-button text-white w-full bg-orange-500 rounded-md h-14 mb-4 hover:bg-orange-600" onClick={handleLogin}>
                        Sign In
                    </button>
                    <h1 className="text-gray-400 text-center mb-4">or</h1>
                    <button className="form-button text-white w-full bg-orange-700 rounded-md h-14 hover:bg-orange-600" onClick={handleRegister}>
                        Sign Up
                    </button>
                    <h1 className="mt-4 text-blue-400 underline text-center cursor-pointer">Forgot Password?</h1>
                </form>
            </div>
        </div>
    );
}

export default Login;