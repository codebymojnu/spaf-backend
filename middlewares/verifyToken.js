
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, 'mdmojnumiah');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({ message: 'Invalid token' });
    }
};
