import React, { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { BASE_URI } from "../config";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URI}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const userInfo = await response.json();
            localStorage.setItem("jwtToken", userInfo.token);
            setUserInfo(userInfo);
            setRedirect(true);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (redirect) return <Navigate to="/" />;

    return (
        <div className="flex justify-center items-center h-[90vh]">
            <form onSubmit={handleLogin} className="border-black w-96 p-6 rounded-lg border-2">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                <input
                    type="text"
                    className="w-full p-2 border-2 border-gray-300 rounded-md mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-full p-2 border-2 border-gray-300 rounded-md mb-4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="text-right mb-3">
                    <Link to="/register" className="text-gray-400">Don't have an account?</Link>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 border-2 rounded-md flex justify-center items-center"
                    disabled={loading}
                >
                    {loading ? <span className=" bg-black loader w-5 h-5 animate-spin"></span> : "Login"}
                </button>
            </form>
        </div>
    );
}