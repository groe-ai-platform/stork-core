const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// REGISTER - Add a new user to the STORK system
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
    // For now, we'll confirm the data is received
    // Later, this will save to your PostgreSQL database on Render
    res.status(201).json({ 
        message: "Registration successful",
        user: email,
        business: "GROE Entertainment, Inc."
    });
});

// LOGIN - Create a secure session token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // This 'token' is like a digital key card for the app
    const token = jwt.sign(
        { email, role: 'customer' }, 
        process.env.JWT_SECRET || 'groe_internal_key', 
        { expiresIn: '24h' }
    );
    
    res.json({ 
        success: true,
        token: token,
        message: "Welcome to STORK Mission Control"
    });
});

module.exports = router;
