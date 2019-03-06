'use strcit';

const db = require('./db');
const models = require('./model');

module.exports = async (app) => {
    try {
        db(app);
        await models();   
        const routes = require('./router')
        app.use('/api/v1', routes);
        app.use('/*', (req, res) => res.status(404).send({ success: false, api: 'test', message: 'path not found' }));
    } catch (err) {
        console.log('Root error is: ', err);
    }
}