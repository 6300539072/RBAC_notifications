const express = require('express');
const { register, login, updateUser, deleteUser,getUsers } = require('../controllers/authController');
const { validateRegister, validateLogin ,validateUpdateUser } = require('../middleware/validationMiddleware');
const { verifyToken } = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/register', validateRegister, register);
// router.put('/update/:id', verifyToken, validateUpdateUser, updateUser);
router.post('/login', validateLogin, login);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/user',getUsers)


module.exports = router;
