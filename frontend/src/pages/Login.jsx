import { useState } from "react";
import api from "../api";
import Navbar from '../components/Navbar';

import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import React from 'react';

function Login({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = "login" 

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post("/api/token/", { username, password })
            
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/collection/all")
                
            
        } catch (error) {
            alert(error)
        } finally {
            console.log("Login Success")
        }
    };

    return (
        <div className="flex w-screen h-screen">
            <div className="hidden md:flex w-1/2 h-screen bg-[#333333]"></div>
            <div className="w-full md:w-1/2 h-screen bg-[#1E1E1E] items-center justify-center">
            <form onSubmit={handleSubmit} className="flex w-3/4 h-max flex-col justify-self-center mt-20">
            <div className="flex flex-row items-center justify-center">
            <img src='/material-layout-stack-svgrepo-com.svg' width={100}></img>
            <h1 className="text-3xl text-white font-bold ml-4 ">MyTier</h1>
            </div>
            <input
                className="form-input  w-full rounded-sm h-14 mb-8 p-2"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input  w-full rounded-sm h-14 p-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <h1 className="mb-8 text-blue-400 underline ml-auto">Forgot Password?</h1>
           
            <button className="form-button text-white w-full bg-[#428EFF] rounded-md h-14 mb-4" type="submit">
                Sign In
            </button>
            <h1 className="text-white text-center mb-4"> --------- or --------- </h1>
            <button className="form-button text-white w-full bg-[#428EFF] rounded-md h-14" type="submit">
                Sign In
            </button>
        </form>
            </div>
        </div>
    );
}

export default Login


{/* <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
           
            <button className="form-button" type="submit">
                Login
            </button>
        </form> */}