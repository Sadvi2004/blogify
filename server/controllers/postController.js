const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

exports.createPost = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const { originalname, path: tempPath } = req.file;
        const ext = originalname.split(".").pop();
        const filename = `${Date.now()}.${ext}`;
        const newPath = path.join(__dirname, "..", "uploads", filename);

        fs.renameSync(tempPath, newPath);

        const { title, summary, content } = req.body;
        const post = await Post.create({
            title,
            summary,
            content,
            cover: filename,
            author: req.user.id,
        });

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', ['username']);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, summary, content } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Ensure only the author can update the post
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized to update this post" });
        }

        post.title = title;
        post.summary = summary;
        post.content = content;
        await post.save();

        res.json({ message: "Post updated successfully" });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// DELETE POST
exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Ensure only the author can delete the post
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized to delete this post" });
        }

        await post.deleteOne();
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};