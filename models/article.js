'use strict';

const mongoose = require('mongoose');

const Article = new mongoose.Schema({
    article_title: {type: String, required: true},
    article_name: {type: String, required: true},
    content: {type: String, required: true}
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Article', Article, 'articles');