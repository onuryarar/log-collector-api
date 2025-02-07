const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: 'Not Authorized'
        });
    }
};