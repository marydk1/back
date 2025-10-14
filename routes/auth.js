const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const router = express.Router();

// Register
router.post('/register', async (req,res) => {
  try{
    const { username, password, role } = req.body;
    if(!username || !password) return res.status(400).json({message:'Missing fields'});
    const existing = await User.findOne({username});
    if(existing) return res.status(400).json({message:'Username taken'});
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({username, passwordHash, role: role === 'admin' ? 'admin' : 'user'});
    await user.save();
    res.json({message:'Registration successful'});
  }catch(e){
    console.error(e);
    res.status(500).json({message:'Server error'});
  }
});

// Login
router.post('/login', async (req,res) => {
  try{
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).json({message:'Missing fields'});
    const user = await User.findOne({username});
    if(!user) return res.status(400).json({message:'Invalid credentials'});
    const match = await bcrypt.compare(password, user.passwordHash);
    if(!match) return res.status(400).json({message:'Invalid credentials'});
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, role: user.role });
  }catch(e){
    console.error(e);
    res.status(500).json({message:'Server error'});
  }
});

module.exports = router;
