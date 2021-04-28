const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-z0-9][-a-z0-9._]+@([-a-z]+[.])+[a-z]{2,3}$/
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);