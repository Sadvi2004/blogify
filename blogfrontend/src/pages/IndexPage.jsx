import React, { useState, useEffect } from "react";
import Post from "../Post";
import { BASE_URI } from "../config";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);

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
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Post key={post._id} {...post} />
                    ))
                ) : (
                    <p className="text-center text-gray-600 font-semibold">No posts available.</p>
                )}
            </div>
        </div>
    );
}
