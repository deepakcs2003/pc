const express = require('express');
const { signup, login, getAllUsers, updateUser } = require('../controllers/auth');
const router = express.Router();


router.post('/signup',signup );
router.post('/login',login);
router.post('/getAllUsers',getAllUsers)
router.post('/updateuser',updateUser);


module.exports = router;