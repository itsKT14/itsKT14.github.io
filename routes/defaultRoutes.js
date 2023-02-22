const defaultController = require('../controllers/defaultController');
const defaultRoutes = require('express').Router();
const verify = require('../utils/auth');

//home page
defaultRoutes.get('/home', verify.homePageAuth, defaultController.home_page);

//settings page
defaultRoutes.get('/settings/:id', verify.otherPageAuth, defaultController.settings_page);

//settings edit
defaultRoutes.post('/settings/:id', verify.otherPageAuth, defaultController.settings_edit);

//item page
defaultRoutes.get('/item/:id', verify.homePageAuth, defaultController.item_page);

//item edit page
defaultRoutes.get('/item/edit/:id', verify.otherPageAuth, defaultController.item_edit_page);

//item edit
defaultRoutes.post('/item/edit/:id', verify.otherPageAuth, defaultController.item_edit);

//item sold
defaultRoutes.get('/item/sold/:id', verify.otherPageAuth, defaultController.item_sold);

//item delete
defaultRoutes.get('/item/delete/:id', verify.otherPageAuth, defaultController.item_delete);

module.exports = defaultRoutes;