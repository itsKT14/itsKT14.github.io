const defaultController = require('../controllers/defaultController');
const defaultRoutes = require('express').Router();
const verify = require('../utils/auth');

//home page
defaultRoutes.get('/home', verify.homePageAuth, defaultController.home_page);

//settings page
defaultRoutes.get('/settings/:id', verify.otherPageAuth, defaultController.settings_page);

module.exports = defaultRoutes;