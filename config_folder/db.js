'use strict';

const mongoose = require('mongoose');
const url = process.env.DB;

module.exports = (app) => {
    mongoose.connect(url,{ useNewUrlParser: true }, (err)=> {
        if(err) console.log('Connection err: ', err);
    })
    mongoose.connection.on('connected', function () {
        console.log('Mongoose connection open to let_endu_test');
    });

    mongoose.connection.once('open', () => {
        console.log('Connected to mongodb!');
    });

    mongoose.connection.on('error', function (err) {
        console.error('Mongoose default error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('[1]Mongoose default connection disconnected');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
        });
    });
}