
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { getIo } = require('../sockets/notificationSocket');

exports.createComment = async (req, res) => {
    try {
        const { content, post_id } = req.body;
        const post = await Post.findByPk(post_id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        const comment = await Comment.create({
            content,
            author_id: req.user.id,
            post_id,
        });

        // Emit notification to the post's author
        const io = getIo();
        io.to(post.author_id.toString()).emit('newComment', {
            author: req.user.username,
            content,
            timestamp: comment.createdAt,
        });

        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Error: ${err.message}`);
    }
};

