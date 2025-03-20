import React, { useState, useEffect } from "react";
import Post from "../Post";
import { BASE_URI } from "../config";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${BASE_URI}/api/posts`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Fetched posts:", data);
                setPosts(data);
            })
            .catch((err) => console.error("Error fetching posts:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
            <div className="max-w-4xl mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <span className="w-8 h-8 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></span>
                        <span className="ml-2 text-gray-600">Loading posts...</span>
                    </div>
                ) : posts.length > 0 ? (
                    posts.map((post) => <Post key={post._id} {...post} />)
                ) : (
                    <p className=" text-center text-gray-600 font-semibold">No posts available.</p>
                )}
            </div>
        </div>
    );
}