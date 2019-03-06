'use strict';

const route = require('express').Router();
const controller = require('./../controller');

route.get('/test', controller.testRoute);
route.get('/all_user', controller.getAllUser);
route.get('/all_article', controller.getAllArticle),
route.get('/:article_title/get_article', controller.findArticle);

route.post('/create_user', controller.createUser);
route.post('/create_article', controller.createArticle);
route.post('/login', controller.loginUser); 
route.post('/save_visitor', controller.saveAndUpdateVisitor);
route.post('/user_visitor', controller.filterVisitsByUser);
route.post('/article_visitor', controller.filterVisitByArticle);



module.exports = route;
