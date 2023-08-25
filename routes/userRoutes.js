const userController = require('../controllers/userController');
const router = require('express').Router();
const { otherPageAuth } = require('../utils/auth');
const multer = require("multer");
const multerUpload = multer();

router.get('/login', (req, res)=>{
    res.render('login',{message: false, title:"Login"});
});

router.get('/register', (req, res)=>{
    res.render('register',{message: false, title:"Register"});
});

router.get('/logout', (req, res)=>{
    res.clearCookie('token');
    res.redirect('login');
});

//profile view
router.get('/profile/:id', otherPageAuth, userController.user_profile);

//sell view
router.get('/sell', otherPageAuth, userController.user_sell_view);

//sell
router.post('/sell', otherPageAuth, multerUpload.single("image_file"), userController.user_sell);

//add user
router.post('/register', userController.user_add);

//login user
router.post('/login', userController.user_login);

module.exports = router;