import React, { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Editor from "../Editor";
import { BASE_URI } from "../config";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false); // State for delete loading animation
    const [redirect, setRedirect] = useState(false);
    const [fetching, setFetching] = useState(true);

    // Fetch post details when component mounts
    useEffect(() => {
        async function fetchPost() {
            const token = localStorage.getItem("jwtToken");
            if (!token) {
                setError("Unauthorized! Please log in.");
                setFetching(false);
                return;
            }

            try {
                const response = await fetch(`${BASE_URI}/api/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 401) {
                    setError("Session expired. Please log in again.");
                    setFetching(false);
                    return;
                }

                if (!response.ok) throw new Error("Failed to fetch post");
                const postInfo = await response.json();

                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            } catch (err) {
                setError("Error loading post data. " + err.message);
            } finally {
                setFetching(false);
            }
        }
        fetchPost();
    }, [id]);

    // Function to update the post
    async function updatePost(e) {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("jwtToken");
        if (!token) {
            setError("Unauthorized! Please log in.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("summary", summary);
        formData.append("content", content);
        if (files) formData.append("file", files[0]);

        try {
            const res = await fetch(`${BASE_URI}/api/posts/${id}`, {
                method: "PUT",
                body: formData,
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 401) {
                setError("Session expired. Please log in again.");
                navigate("/login");
                return;
            }

            if (!res.ok) throw new Error("Failed to update post");
            setRedirect(true);
        } catch (err) {
            setError("Update failed! " + err.message);
        } finally {
            setLoading(false);
        }
    }

    // Function to delete the post
    async function deletePost() {
        setDeleting(true); // Show "Deleting..." state

        const token = localStorage.getItem("jwtToken");
        if (!token) {
            setError("Unauthorized! Please log in.");
            setDeleting(false);
            return;
        }

        try {
            const res = await fetch(`${BASE_URI}/api/posts/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 401) {
                setError("Session expired. Please log in again.");
                navigate("/login");
                return;
            }

            if (!res.ok) throw new Error("Failed to delete post");
            setRedirect(true);
        } catch (err) {
            setError("Deletion failed! " + err.message);
        } finally {
            setDeleting(false);
            setShowPopup(false);
        }
    }

    if (redirect) return <Navigate to="/" />;

    if (fetching) {
        return (
            <div className="flex justify-center items-center h-screen bg-black text-white text-2xl">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-white text-black border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-center">Edit Post</h2>

            {error && <p className="text-red-600 text-center">{error}</p>}

            <form onSubmit={updatePost} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-400 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="border border-gray-400 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="file"
                    onChange={(e) => setFiles(e.target.files)}
                    className="border border-gray-400 p-3 rounded-lg"
                />
                <Editor onChange={setContent} value={content} />

                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Post"}
                    </button>
                    <button
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                        onClick={() => setShowPopup(true)}
                        disabled={deleting}
                    >
                        {deleting ? "Deleting..." : "Delete Post"}
                    </button>
                </div>
            </form>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <p className="text-lg font-semibold text-center">
                            Are you sure you want to delete this post?
                        </p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deletePost}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
