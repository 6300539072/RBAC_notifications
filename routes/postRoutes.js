const express = require('express');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware'); 
const validatePost =require('../middleware/validationMiddleware')
const router = express.Router();

router.route('/')
    .post(auth,checkRole(['Admin', 'Moderator', 'User']), createPost)
    .get(auth, getPosts);

router.route('/:id')
    .get(auth, getPostById)
    .put(auth,checkRole(['Admin', 'Moderator', 'User']), updatePost)
    .delete(auth, checkRole(['Admin', 'Moderator']), deletePost);

module.exports = router;
