import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { BASE_URI } from "../config";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        fetch(`${BASE_URI}/api/posts/${id}`)
            .then(response => response.json())
            .then(postInfo => setPostInfo(postInfo));
    }, [id]);

    if (!postInfo) return '';

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            <div className="w-full mb-6">
                <img
                    src={`${BASE_URI}/uploads/${postInfo.cover}`}
                    alt="Post Cover"
                    className="w-full h-96 object-cover rounded-lg"
                    onError={(e) => (e.target.src = "/default-image.jpg")}
                />
            </div>

            <h1 className="text-4xl font-bold mb-4 px-6">{postInfo.title}</h1>
            <p className="text-gray-700 text-lg mb-6 px-6">{postInfo.summary}</p>

            <div
                className="text-gray-800 leading-relaxed px-6"
                dangerouslySetInnerHTML={{ __html: postInfo.content }}
            />

            <div className="text-gray-500 text-sm mt-6 px-6">
                by <span className="font-semibold">@{postInfo.author?.username || "Unknown"}</span> |{" "}
                <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            </div>

            {userInfo?.id === postInfo.author?._id && (
                <div className="flex justify-center mt-6">
                    <Link
                        to={`/edit/${postInfo._id}`}
                        className="flex items-center gap-2 bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        <i className="fa-solid fa-pen-to-square text-lg"></i>
                        Edit this post
                    </Link>
                </div>
            )}
        </div>
    );
}
