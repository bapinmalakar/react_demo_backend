'use strcit';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Article = mongoose.model('Article');
const Visitor = mongoose.model('Visitor');
const response = require('./../response');

module.exports = {
    testRoute: async (req, res) => {
        try {
            return response.send_response(res, { message: 'runnning' });
        } catch (err) {
            console.log('Error is: ', err);
            response.error_response(res, err);
        }
    },

    createUser: async (req, res) => {
        try {
            const user = await User.findOne({ user_id: req.body.user_id });
            console.log('User:: ', user);
            if (user) {
                throw response.craeteError(409, 'this user already present');
            }
            const newUser = new User(req.body);
            await newUser.save();
            return response.send_response(res, newUser);
        } catch (err) {
            console.log('Error is: ', err);
            return response.error_response(res, err);
        }
    },

    getAllUser: async (req, res) => {
        try {
            const data = await User.find({}).lean();
            return response.send_response(res, data);
        } catch (err) {
            console.log('Error is: ', err);
            return response.error_response(res, err);
        }
    },

    createArticle: async (req, res) => {
        try {
            const article = await Article.findOne({ article_title: req.body.article_title }).lean();
            if (article) {
                throw response.craeteError(409, 'this article already present');
            }
            const saveData = new Article(req.body);
            await saveData.save();
            return response.send_response(res, { message: 'done' });
        } catch (err) {
            console.log('Error is: ', err);
            return response.error_response(res, err);
        }
    },

    getAllArticle: async (req, res) => {
        try {
            const data = await Article.find({}).lean();
            return response.send_response(res, data);
        } catch (err) {
            console.log('Error is: ', err);
            return response.error_response(res, err);
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ user_id: req.body.user_id, password: req.body.password }).lean();
            if (!user) {
                throw response.craeteError(401, 'user_id or password not match');
            }
            delete user['password'];
            return response.send_response(res, user);
        } catch (err) {
            console.log('Error is: ', err);
            return response.error_response(res, err);
        }
    },

    saveAndUpdateVisitor: async (req, res) => {
        try {
            let dateIs = new Date();
            const dateString = `${dateIs.getDate()}/${dateIs.getMonth() + 1}/${dateIs.getFullYear()}`;
            const visitor = await Visitor.findOne({ article_title: req.body.article_title, date_string: dateString });
            const userIs = req.body.user_id;
            if (visitor) {
                visitor.user_details[userIs] ? visitor.user_details[userIs].count = visitor.user_details[userIs].count + 1 : visitor.user_details[userIs] = { name: req.body.user_name, count: 1 };
                await Visitor.updateOne({ _id: visitor._id }, { $set: { user_details: visitor.user_details } });
                return response.send_response(res, {message: 'done'});
            } else {
                dateIs.setMinutes(00);
                dateIs.setHours(00);
                dateIs.setSeconds(1);
                const millisecond = dateIs.getTime();
                const newVisitor = new Visitor(req.body);
                newVisitor['date_string'] = dateString;
                newVisitor['milliseconds'] = millisecond;
                newVisitor['user_details'] = {}
                newVisitor['user_details'][userIs] = { name: req.body.user_name, count: 1 };
                await newVisitor.save();
                return response.send_response(res, { message: 'done!' });
            }
        } catch (err) {
            console.log('Error is: ', err);
            return response.error_response(res, err);
        }
    },

    findArticle: async (req, res) => {
        try {
            const data = await Article.findOne({ article_title: req.params.article_title });
            return response.send_response(res, data);
        } catch (err) {
            console.log('Error is: ', err);
            return response.error_response(re, err);
        }
    },

    filterVisitsByUser: async (req, res) => {
        try {
            const fieldName = "user_details." + req.body.user;
            const data = await Visitor.find({ [fieldName]: { $exists: true }, milliseconds: { $gte: req.body.millisend1, $lte: req.body.millisend2 } });
            if (!data || !data.length)
                return response.send_response(res, null);

            const datesAre = {};
            for (let item of data) {
                if (!datesAre[item.date_string]) {
                    datesAre[item.date_string] = {};
                }
                continue;
            }
            for (let item of data) {
                if (item['user_details'][req.body.user]) {
                    datesAre[item.date_string][item.article_title] = item['user_details'][req.body.user];
                }
            }
            return response.send_response(res, datesAre);
        } catch (err) {
            console.log('Error is: ', err);
            return response.error_response(res, err);
        }
    },

    filterVisitByArticle: async (req, res) => {
        try {
            const data = await Visitor.find({ article_title: req.body.article_title, milliseconds: { $gte: req.body.millisend1, $lte: req.body.millisend2 } });
            return response.send_response(res, data);
        } catch (err) {
            console.log('Error is: ', err);
            return response.error_response(res, err);
        }
    }
}