const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
        name,
        email,
        password : hashedPassword
    });

    if(!user) {
        return res.status(400).json({ message: 'Something went wrong' });
    } else {
                const token = generateToken(user);

        res.status(201).json({ message: 'User created', token, user });
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email});

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ userId: user._id, token });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }

});


const currentUser = asyncHandler(async  (req, res) => {
    res.send('Current User');
});

const getUsers = asyncHandler(async (req, res) => {
    res.json({message : 'Hello World'});
});

const generateToken = (user) => {
    const payload = {
        userId: user.id,
        email: user.email
    };

    const options = {
        expiresIn: '72h'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

module.exports = {
    getUsers,
    register,
    login,
    currentUser
};