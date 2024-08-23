const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    define: {
        timestamps: true, // Example: add `createdAt` and `updatedAt` fields automatically
    },
});
console.log("1111111111111111",process.env.MYSQL_HOST)
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected...');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
