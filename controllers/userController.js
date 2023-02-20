const User = require('../models/userModel');
const validation = require('../utils/validation');
const bcrypt = require('../utils/bcrypt');
const jwt = require('jsonwebtoken');

const fs = require('fs')
const { google } = require('googleapis');

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
            email: logUser.email,
            name: logUser.name
            }, process.env.TOKEN_SECRET, {expiresIn: "2h"});

        res.cookie('token', token, { maxAge: 900000, httpOnly: true });

        res.redirect('/home');
	} catch (error) {
		res.status(400).send("ERROR");
		console.log(error);
	}
}

const user_profile = async (req, res) => {
    const logEmail = req.getUser.email;
    const logUser = await User.findOne({email: logEmail});
    info = {
        email: logUser.email,
        pic: logUser.pic || "/img/user-icon.png",
        address: logUser.address || "Unknown"
    }
    res.render('profile',{
        title: "Profile",
        userName: logUser.name,
        info
    });
}

const user_sell_view = async (req, res) => {
    const logName = req.getUser.name;
    res.render('sell',{title: "Sell", userName: logName});
}

const user_sell_upload = async (req, res) => {
    const GOOGLE_API_FOLDER_ID = '1-piOPBbYYcSGwEgBRNl1PJbtmCkMkoeK';
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: './googlekey.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        })
    
        const driveService = google.drive({
            version: 'v3',
            auth
        })
    
        const fileMetaData = {
            'name': 'snowplace.jpg',
            'parents': [GOOGLE_API_FOLDER_ID]
        }
    
        const media = {
            mimeType: 'image/jpg',
            body: fs.createReadStream('./chellocat.jpg')
        }
        
        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            field: 'id'
        })
        console.log(response.data.id);
    } catch (error) {
        console.log('Upload file error', error)
    }
    res.redirect('/user/sell');
    //https://drive.google.com/uc?export=view&id=
}

module.exports = {
    user_add,
    user_login,
    user_profile,
    user_sell_view,
    user_sell_upload
}