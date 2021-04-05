const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    namespace: { type: String },
    datetime: { type: Date, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true },
    message: { type: String },
    details: { type: String },
    user: { type: String },
    userAgent: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);