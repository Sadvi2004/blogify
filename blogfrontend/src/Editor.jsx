import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor({ value, onChange }) {
    useEffect(() => {
        if (typeof window !== "undefined" && window.MutationObserver) {
            const observer = new MutationObserver(() => { });
            observer.observe(document, { childList: true, subtree: true });
        }
    }, []);

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    return (
        <div className="mt-4">
            <ReactQuill
                value={value}
                theme="snow"
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder="Start writing here..."
                className="rounded-lg border border-gray-300 bg-white text-black"
            />
            <style>
                {`
                .ql-editor img {
                    max-width: 100%;
                    max-height: 250px;
                    object-fit: cover;
                    border-radius: 8px;
                }
                .ql-editor a {
                    cursor: pointer;
                    color: #2563eb;
                    text-decoration: underline;
                    font-weight: 500;
                }
                .ql-container {
                    min-height: 200px;
                }
                `}
            </style>
        </div>
    );
}
