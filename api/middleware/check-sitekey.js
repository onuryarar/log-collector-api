module.exports = (req, res, next) => {
    const siteKey = req.query.sitekey;

    if (!siteKey) {
        return res.status(400).json({
            message: 'No sitekey supplied'
        });
    }

    // eg. 2262a934990c4eb79544ae83ae2a2ec6
    if (siteKey.length !== 32) {
        return res.status(400).json({
            message: 'Bad sitekey'
        });
    }

    next();
};