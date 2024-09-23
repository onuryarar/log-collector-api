const mongoose = require('mongoose');

const AuditLog = require('../models/auditLog');

module.exports = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] ?? '';
    const ua = req.headers['user-agent'] ?? '';
    const url = req.headers['origin'] ?? '';

    req.log = async ({ action, userId = null, oldData = '' }) => {
        userId = req.user?.userId || userId;

        const auditLog = new AuditLog({
            _id: new mongoose.Types.ObjectId(),
            action,
            userId,
            ip,
            userAgent: ua,
            url,
            oldData
        })
        auditLog.save()
            .catch(err => {
                console.log(err);
            })
    }

    next();
}