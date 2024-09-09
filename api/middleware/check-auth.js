const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const [method, token] = req.headers.authorization.split(' ');
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Not Authorized'
        });
    }
};