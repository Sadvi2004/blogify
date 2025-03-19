const express = require('express');
const multer = require('multer');
const { createPost, getAllPosts, getPost, deletePost, updatePost } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', authMiddleware, upload.single('file'), createPost);
router.get('/', getAllPosts);
router.get('/:id', getPost);
router.put('/:id', authMiddleware, upload.single('file'), updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;