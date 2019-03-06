'use strict';

const mongoose = require('mongoose');
const Visitor = new mongoose.Schema({
    article_title: {type: String, required: true},
    article_id: { type: String, required: true},
    date_string: { type: String, required: true},
    milliseconds: {type: Number, required: true},
    user_details: {
        type: Object,
        default: null
    }
}, {
    versionKey: false,
    timestamps: false
});

module.exports = mongoose.model('Visitor', Visitor, 'visitors');