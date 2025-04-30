const express = require('express');
const { signup, login, getAllUsers, updateUser } = require('../controllers/auth');
const { authenticate } = require('../auth/auth');
const router = express.Router();


router.post('/signup',signup );
router.post('/login',login);
router.post('/getAllUsers',authenticate,getAllUsers)
router.post('/updateuser',updateUser);


module.exports = router;