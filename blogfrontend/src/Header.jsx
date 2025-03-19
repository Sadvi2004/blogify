import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { BASE_URI } from "./config";

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
            setUserInfo(null);
            return;
        }

        fetch(`${BASE_URI}/api/auth/profile`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, // ✅ Attach the token
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => {
                if (data?.username) {
                    setUserInfo(data);
                } else {
                    setUserInfo(null);
                }
            })
            .catch(error => console.error("Error fetching user profile:", error));
    }, [setUserInfo]);

    async function logout() {
        try {
            const response = await fetch(`${BASE_URI}/api/auth/logout`, {
                credentials: 'include',
                method: 'POST',
            });
            if (response.ok) {
                localStorage.removeItem("jwtToken"); // ✅ Remove token on logout
                setUserInfo(null);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const username = userInfo?.username;

    return (
        <header className="p-3 bg-primary flex justify-between items-center h-14 text-third shadow-md">
            <Link to="/" className="text-fourth font-bold text-xl text-secondary">Blogify</Link>
            <nav className="flex gap-4">
                {username ? (
                    <>
                        <Link to="/create" className="text-third py-8 text-secondary">
                            Create new post
                        </Link>
                        <button
                            onClick={logout}
                            className="text-secondary py-8 cursor-pointer">
                            Logout ({username})
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-secondary">
                            Login
                        </Link>
                        <Link to="/register" className="text-secondary">
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>


    );
}
