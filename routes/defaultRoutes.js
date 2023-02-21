const User = require('../models/userModel');
const userController = require('../controllers/userController');
const defaultRoutes = require('express').Router();
const verify = require('../utils/auth');

//home page
defaultRoutes.get('/home', verify.homePageAuth, (req, res)=>{
    const paramId = req.getUser.id || "";
    const user = req.getUser.name || "";
    const urlPic = req.getUser.pic;
    res.render('home',{title:"Home", id: paramId, userName: user, pic: urlPic});
});

//edit profile - settings
defaultRoutes.get('/settings/:id', verify.homePageAuth, async (req, res)=>{
    const paramId = req.getUser.id || "";
    const user = req.getUser.name || "";
    const urlPic = req.getUser.pic;
    const logUser = await User.findOne({_id: paramId});
    info = {
        name: logUser.name,
        email: logUser.email,
        pic: logUser.pic || "/img/user-icon.png",
        address: logUser.address || "Unknown"
    }
    res.render('settings',{title:"Settings", id: paramId, userName: user, pic: urlPic, info});
});

module.exports = defaultRoutes;