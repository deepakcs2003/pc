const bcrypt = require('bcryptjs');
const User = require('../models/User');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  const { username, password, firstName, lastName ,role } = req.body;

  if (!username || !password || !firstName || !lastName || !role) {
    return res.status(400).json({ message: 'All fields are required', success: false });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      role
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Signup Done"
    });

  } catch (e) {
    console.log("Error:", e);
    return res.status(500).json({
      success: false,
      error: e.message
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  require('dotenv').config();
  const SECRET_KEY = process.env.JWT_SECRET;
  if (!username || !password) {
    return res.json({
      success: false,
      message: "UserName Or Pass Missing"
    });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
     
    const payload = {
        userId: user._id,
        username: user.username
      };
   
      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: '9h' 
      });
    return res.status(200).json({ message: 'Login successful' ,token });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message
    });
  }
};

exports.updateUser = async (req, res) => {
  const { username, firstName, lastName } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, message: 'Username is required to update' });
  }

  try {
    const updated = await User.findOneAndUpdate(
      { username },
      { firstName, lastName },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User updated successfully' });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username firstName lastName'); 

    res.status(200).json({ success: true, users });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
