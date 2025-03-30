const express = require("express");
const multer = require("multer");
const cors = require('cors');
const router = express.Router();
const app = express();
const Admins = require('../models/Admins')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


app.use(cors());


router.get("/allAdmins", async (req, res) => {
    try {
      const users = await Admins.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  router.post('/create-admin', async (req, res) => {
    const { name, email, username, password } = req.body;
  
    if (!name || !email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const existingUser = await Admins.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Email or username already taken' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new Admins({
        adminFullName: name,
        adminEmail: email,
        adminUsername: username,
        adminLoginPassword: hashedPassword,
      });
  
      await newUser.save();
  
      // Generate token (keep it as needed)
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Return the newly created user along with the token if necessary
      res.status(201).json({ 
        user: {
          adminFullName: newUser.adminFullName,
          adminEmail: newUser.adminEmail,
          adminUsername: newUser.adminUsername,
        },
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    try {
      // Find user by username
      const user = await Admins.findOne({ adminUsername: username }); // Field should match your DB schema
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // Compare hashed password with the provided password
      const isMatch = await bcrypt.compare(password, user.adminLoginPassword);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (err) {
      console.error("Login error:", err); // Log error for debugging
      res.status(500).json({ error: 'Server error' });
    }
  });
module.exports = router;