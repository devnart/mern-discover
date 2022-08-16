const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    if(req.headers.authorization) {
     
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (e) {
        res.status(400).send('Invalid token.');
    }
       
} else {
    res.status(401).send('Access denied. No authorization header provided.');
}
}

module.exports = { authMiddleware };