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

// userRoutes.get('/profile', verify, (req, res)=>{
//     const user = req.getUser.name || "";
//     res.render('register',{title:"Register", userName:user});
// });
userRoutes.get('/profile', verify, userController.user_profile);

//add user
userRoutes.post('/register', userController.user_add);

//login user
userRoutes.post('/login', userController.user_login);



module.exports = userRoutes;