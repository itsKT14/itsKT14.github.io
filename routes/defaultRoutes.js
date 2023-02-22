const defaultController = require('../controllers/defaultController');
const defaultRoutes = require('express').Router();
const verify = require('../utils/auth');

//home page
defaultRoutes.get('/home', verify.homePageAuth, defaultController.home_page);

//settings page
defaultRoutes.get('/settings/:id', verify.otherPageAuth, defaultController.settings_page);

//item page
defaultRoutes.get('/item/:id', verify.homePageAuth, defaultController.item_page);

module.exports = defaultRoutes;