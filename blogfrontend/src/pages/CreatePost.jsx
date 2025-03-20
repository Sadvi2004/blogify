import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import "react-quill/dist/quill.snow.css";
import { BASE_URI } from '../config';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);

    async function createNewPost(e) {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("jwtToken"); // Get JWT token
        if (!token) {
            alert("You need to be logged in to create a post.");
            setLoading(false);
            return;
        }

        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);

        if (files && files.length > 0) {
            data.set("file", files[0]);
        }

        try {
            const res = await fetch(`${BASE_URI}/api/posts`, {
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            });

            if (res.ok) {
                setRedirect(true);
            } else {
                alert("Failed to create post.");
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white text-black rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-6 text-center">Create New Post</h2>
            <form onSubmit={createNewPost} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Enter title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="text"
                    placeholder="Enter summary..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="file"
                    onChange={(e) => setFiles(e.target.files)}
                    className="border border-gray-300 p-2 rounded-md cursor-pointer"
                />

                <Editor value={content} onChange={setContent} />

                <button
                    type="submit"
                    className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all flex justify-center items-center"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8h4z"
                                />
                            </svg>
                            Creating...
                        </div>
                    ) : (
                        "Create Post"
                    )}
                </button>
            </form>
        </div>
    );
}