const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
require('dotenv').config();

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        // Find the user by decoded ID
        const user = await User.findByPk(decoded.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach the user object to req
        req.user = user;

        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
