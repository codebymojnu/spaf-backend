const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login controller
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Validate user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, 'mdmojnumiah', { expiresIn: '30d' });
        console.log(token)
        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Signup controller
exports.signup = async (req, res) => {
    const { username, password, isAdmin } = req.body;

    try {
        // Validate user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if the user already exists
        let existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            isAdmin: isAdmin || false // Set default value if isAdmin is not provided
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id, isAdmin: newUser.isAdmin }, 'mdmojnumiah', { expiresIn: '30d' });

        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
