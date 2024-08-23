const Post = require('../models/Post');
const User = require('../models/User')
const { validationResult } = require('express-validator');
const { Op } = require('sequelize'); 

exports.createPost = async (req, res) => {
    console.log("req.user.id",req.user.id,req.body)
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            author_id: req.user.id,
        });
        console.log("222222222",newPost)
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await User.findAll();
        console.log("posts",posts)
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// exports.getPosts = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, searchTerm = '' } = req.query;
//         console.log("searchTerm",searchTerm)
//         // Calculate offset for pagination
//         const offset = (page - 1) * limit;

//         // Build the search condition
//         const searchCondition = searchTerm
//             ? {
//                   where: {
//                       title: {
//                           [Op.like]: `%${searchTerm}%`,
//                       },
//                   },
//               }
//             : {};

//         // Fetch posts with pagination and search
//         const posts = await Post.findAndCountAll({
//             ...searchCondition,
//             limit: parseInt(limit),
//             offset: parseInt(offset),
//             order: [['createdAt', 'DESC']],
//             include: ['author'], // include related data, e.g., author
//         });

//         // Respond with the posts and additional pagination info
//         res.json({
//             totalItems: posts.count,
//             totalPages: Math.ceil(posts.count / limit),
//             currentPage: parseInt(page),
//             posts: posts.rows,
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send(`Error: ${err.message}`);
//     }
// };

// exports.getPosts = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, searchTerm = '' } = req.query;

//         const offset = (page - 1) * limit;

//         const searchCondition = searchTerm
//             ? {
//                   where: {
//                       title: {
//                           [Op.like]: `%${searchTerm}%`,
//                       },
//                   },
//               }
//             : {};

//         const posts = await Post.findAndCountAll({
//             ...searchCondition,
//             limit: parseInt(limit),
//             offset: parseInt(offset),
//             order: [['createdAt', 'DESC']],
//             include: [
//                 {
//                     model: User,
//                     as: 'author', // Use the alias defined in the association
//                     attributes: ['id', 'username', 'email'], // Specify the fields you want to include
//                 },
//             ],
//         });

//         res.json({
//             totalItems: posts.count,
//             totalPages: Math.ceil(posts.count / limit),
//             currentPage: parseInt(page),
//             posts: posts.rows,
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updatePost = async (req, res) => {
    try {
        console.log("333333333333333",req.params.id)
        let post = await Post.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
      
        if (post.authorId !== req.user.id && req.user.role !== 'Admin' && req.user.role !== 'Moderator') {
            return res.status(403).json({ msg: 'User not authorized' });
        }
        post = await Post.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({"message":"successfully updated"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('error server');
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        if (post.authorId !== req.user.id && req.user.role !== 'Admin' && req.user.role !== 'Moderator') {
            return res.status(403).json({ msg: 'User not authorized' });
        }
        await Post.destroy({ where: { id: req.params.id } });
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
