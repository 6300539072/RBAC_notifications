// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db');

// const Comment = sequelize.define('Comment', {
//     content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     author_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     post_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
// }, {
//     timestamps: true,
// });

// module.exports = Comment;
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Post = require('./Post');
const User = require('./User');

class Comment extends Model {}

Comment.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Comment',
});

Comment.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
Comment.belongsTo(Post, { foreignKey: 'post_id', as: 'post' });

module.exports = Comment;
