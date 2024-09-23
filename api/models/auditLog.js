const mongoose = require('mongoose');

const auditLogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    action: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId },
    ip: { type: String },
    userAgent: { type: String },
    url: { type: String },
    oldData: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);