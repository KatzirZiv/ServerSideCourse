const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    marital_status: { type: String, default: 'unknown' },
    birthday: { type: Date, default: Date.now }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
