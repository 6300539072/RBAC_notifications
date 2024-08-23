// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db');

// const Post = sequelize.define('Post', {
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     author_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
// }, {
//     timestamps: true,
// });
// models/Post.js
// Post.js
// const { Model, DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db'); // Ensure this is the correct path

// class Post extends Model {}

// Post.init({
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     author_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'users',
//             key: 'id',
//         },
//     },
// }, {
//     sequelize, 
//     modelName: 'Post',
// });

// module.exports = Post;

const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

class Post extends Model {}

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
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
}, {
    sequelize,
    modelName: 'Post',
});

Post.belongsTo(User, { foreignKey: 'author_id', as: 'author' });

module.exports = Post;

// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/db'); // Import the Sequelize instance
// const User = require('./User'); // Import the User model for association

// class Post extends Model {}

// Post.init({
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     author_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: User, // Reference to the User model
//             key: 'id',
//         },
//     },
// }, {
//     sequelize, // Pass the Sequelize instance
//     modelName: 'post', // Name of the model
// });

// // Define associations
// Post.belongsTo(User, { foreignKey: 'author_id', as: 'author' });

// module.exports = Post;

