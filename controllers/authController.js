const User = require('../models/User');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

exports.register = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const { username, email, password ,role} = req.body;
    // if(req.body.role) role =
    try {
      const user = await User.create({ username, email, password,role });
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

exports.login = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').exists().withMessage('Password is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];


exports.getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10; 
        const search = req.query.search || '';
        console.log("search ",search)
        const offset = (page - 1) * limit;

        console.log(`Fetching users with page=${page}, limit=${limit}, search=${search}`);
        
        const { count, rows } = await User.findAndCountAll({
            where: {
                [Op.or]:[
                    { id: { [Op.like]: `%${search}%` } },
                    { username: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }, 
                    { password: { [Op.like]: `%${search}%` } }, 
                    { role: { [Op.like]: `%${search}%` } },
                    { createdAt: { [Op.like]: `%${search}%` } }, 
                    { updatedAt: { [Op.like]: `%${search}%` } }
            ]
            },
            limit: limit,
            offset: offset, 
            order: [['createdAt', 'DESC']], 
        });

        // Calculate totalPages
        const totalPages = Math.ceil(count / limit);

        res.json({
            totalRecords: count,
            totalPages: totalPages,
            currentPage: page,
            users: rows
        });
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).send('Server error');
    }
};
exports.updateUser = [
    // body('username').optional().notEmpty().withMessage('Username cannot be empty'),
    // body('email').optional().isEmail().withMessage('Invalid email'),
    // body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  
    async (req, res) => {
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    //   }
  
      const { username, email, password } = req.body;
      console.log("44444444444444")
      try {
        console.log("req.user.id",req.user.id)
        const user = await User.findByPk(req.user.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
        }
  
        await user.save();
        res.json({ message: 'User updated successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  ];
  
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
