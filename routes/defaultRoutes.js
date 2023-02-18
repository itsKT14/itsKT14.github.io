const userController = require('../controllers/userController');
const defaultRoutes = require('express').Router();
const verify = require('../utils/auth');

//home page
defaultRoutes.get('/home', verify, (req, res)=>{
    const user = req.getUser.name || "";
    // let message = false;
    // if(req.cookies.msg) {
    //     message = req.cookies.msg;
    //     res.clearCookie('msg');
    // }
    res.render('home',{title:"Home", userName: user});
});

module.exports = defaultRoutes;