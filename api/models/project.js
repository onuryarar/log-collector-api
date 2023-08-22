const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sitekey: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);