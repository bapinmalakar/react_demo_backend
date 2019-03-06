'use strict';
const mongoose = require('mongoose');
const [path, fs] = [require('path'), require('fs')];

const modelPath = path.resolve(__dirname, './../models');

module.exports = async (app)=> {
    try {
        let fileList = fs.readdirSync(modelPath);
        const modelList =[];
        for(let collection of fileList) {
            modelList.push(await require(`${modelPath}/${collection}`))
        }
        return modelList;
    } catch(err) {
        console.log('Error is: ', err);
    }

}