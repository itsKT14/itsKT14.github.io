const defaultController = require('../controllers/defaultController');
const router = require('express').Router();
const { homePageAuth, otherPageAuth } = require('../utils/auth');
const { streamUploadToPosts, streamUploadToProfile } = require("../utils/cloudinaryHandler");

//home page
router.get('/home', homePageAuth, defaultController.home_page);

//settings page
router.get('/settings/:id', otherPageAuth, defaultController.settings_page);

//settings edit
router.post('/settings/profile/:id', otherPageAuth, defaultController.settings_edit);

//item page
router.get('/item/:id', homePageAuth, defaultController.item_page);

//item edit page
router.get('/item/edit/:id', otherPageAuth, defaultController.item_edit_page);

//item edit
router.post('/item/edit/:id', otherPageAuth, defaultController.item_edit);

//item sold
router.get('/item/sold/:id', otherPageAuth, defaultController.item_sold);

//item delete
router.get('/item/delete/:id', otherPageAuth, defaultController.item_delete);

module.exports = router;