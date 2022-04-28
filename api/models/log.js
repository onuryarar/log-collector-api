const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sitekey: { type: String, required: true },
    bubbles: { type: Array },
    exception: { type: Object },
    reason: { type: String },
    environment: { type: Object },
    timestamp: { type: Number },
    _version: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);