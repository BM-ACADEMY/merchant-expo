const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Replace with a secure key

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });
    
    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), secretKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};