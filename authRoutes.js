const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const db = await connectToDatabase();
        
        // Check if user already exists using findOne
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.collection('users').insertOne({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        const token = jwt.sign({ userId: result.insertedId }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(201).json({ authtoken: token, message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Server error during registration" });
    }
});

// Login endpoint using collection's findOne method (Required for Task 11)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = await connectToDatabase();
        
        // Task 11 requirement: calling findOne to locate the current user in the database
        const user = await db.collection('users').findOne({ email });
        
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials / User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ authtoken: token, userName: user.name });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Server error during login" });
    }
});

module.exports = router;
