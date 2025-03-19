import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { BASE_URI } from "./config";

export default function Post({ _id, title, summary, cover, createdAt, author }) {
    const imageUrl = cover ? `${BASE_URI}/uploads/${cover}` : "/default-image.jpg";

    return (
        <Link to={`/post/${_id}`} className="block">
            <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-300 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className="flex-1 pr-6">
                    <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transition duration-200">
                        {title}
                    </h2>
                    <p className="text-gray-600 mt-3">{summary}</p>
                    <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                        <span className="font-medium text-gray-700">{author?.username || "Unknown Author"}</span>
                        <time>{formatISO9075(new Date(createdAt))}</time>
                    </p>
                </div>
                <div className="w-64 h-40 flex-shrink-0">
                    <img
                        src={imageUrl}
                        alt="Post Cover"
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => (e.target.src = "/default-image.jpg")}
                    />
                </div>
            </div>
        </Link>
    );
}
