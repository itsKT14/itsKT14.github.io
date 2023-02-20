const userRoutes = require('express').Router();
const userController = require('../controllers/userController');
const verify = require('../utils/auth');

userRoutes.get('/login', (req, res)=>{
    res.render('login',{message: false, title:"Login"});
});

userRoutes.get('/register', (req, res)=>{
    res.render('register',{message: false, title:"Register"});
});

userRoutes.get('/logout', (req, res)=>{
    res.clearCookie('token');
    res.redirect('login');
});

//profile view
userRoutes.get('/profile', verify.otherPageAuth, userController.user_profile);

//sell view
userRoutes.get('/sell', verify.otherPageAuth, userController.user_sell_view);

//user sell upload
userRoutes.get('/upload', userController.user_sell_upload);

//add user
userRoutes.post('/register', userController.user_add);

//login user
userRoutes.post('/login', userController.user_login);

module.exports = userRoutes;