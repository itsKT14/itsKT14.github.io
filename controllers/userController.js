const User = require('../models/userModel');
const validation = require('../utils/validation');
const bcrypt = require('../utils/bcrypt');
const jwt = require('jsonwebtoken');

const user_add = async (req, res) => {
	try {
        const { error } =  validation.userValidation.validate(req.body);
        const isExisting = await validation.isExisting(req.body.email);
        if(error) {
            const errorMessage = error.details[0].message;
            return  res.render('register', {message: errorMessage, title: "Register"});
        } else if(isExisting) {
            return  res.render('register', {message: isExisting, title: "Register"});
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.securePassword(req.body.password),
                pic: "",
                address: "",
                phone: 0
            });
            await newUser.save();
            res.render('login', {message: "You have successfuly created an account!", title: "Login"});
        }
	} catch (error) {
		res.status(400).send("ERROR");
		console.log(error);
	}
}

const user_login = async (req, res) => {
    try {
        const { error } = validation.loginValidation.validate(req.body);
        if(error) {
            const errorMessage = error.details[0].message;
            return  res.render('login', {message: errorMessage, title: "Login"});
        }
        const logUser = await User.findOne({email: req.body.email});
        const isValid = await bcrypt.comparePassword(req.body.password, logUser.password);

        if(!logUser) return res.render('login', {message: "The email you've entered is not connected to an account.", title: "Login"});

        if(!isValid) return res.render('login', {message: "The password you've entered is incorrect.", title: "Login"});

        const token = jwt.sign({
            id: logUser._id,
            name: logUser.name
            }, process.env.TOKEN_SECRET, {expiresIn: "1h"});

        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        res.cookie('page',"home", {httpOnly: true});

        res.redirect('/home');
	} catch (error) {
		res.status(400).send("ERROR");
		console.log(error);
	}
}

const user_profile = async (req, res) => {
    const logId = req.getUser.id;
    const logUser = await User.findOne({id: logId});
    console.log(logUser);
    res.render('profile',{
        title:"Profile",
        userName:logUser.name
    });
}

module.exports = {
    user_add,
    user_login,
    user_profile
}