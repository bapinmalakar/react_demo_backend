'use strict';
const mongoose = require('mongoose');

const User = new mongoose.Schema({
    user_name: { type: String, required: true},
    user_id: { type: String, required: true, unique: true},
    password: { type: String, required: true}
}, {versionKey: false, timestamps: true, autoIndex: true});

module.exports = mongoose.model('User', User, 'users');