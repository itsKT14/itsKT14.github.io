const User = require('../models/userModel');
const listing = require('../models/listingModel');
const validation = require('../utils/validation');
const bcrypt = require('../utils/bcrypt');
const jwt = require('jsonwebtoken');
const { streamUploadToPosts } = require("../utils/cloudinaryHandler");

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
                phone: null
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
        if(!logUser) return res.render('login', {message: "The email you've entered is not connected to an account.", title: "Login"});

        const isValid = await bcrypt.comparePassword(req.body.password, logUser.password);
        if(!isValid) return res.render('login', {message: "The password you've entered is incorrect.", title: "Login"});

        const defaultPic = "/img/user-icon.png";
        const getPic = logUser.pic || defaultPic;
        const token = jwt.sign({
            id: logUser.id,
            email: logUser.email,
            name: logUser.name,
            pic: getPic
            }, process.env.TOKEN_SECRET);

        res.cookie('token', token, { httpOnly: true });

        res.redirect('/home');
	} catch (error) {
		res.status(400).send("ERROR");
		console.log(error);
	}
}

const user_profile = async (req, res) => {
    const paramId = req.params.id;
    const tokenId = req.getUser.id;
    if(paramId===tokenId){
        const logUser = await User.findOne({_id: paramId});
        const info = {
            name: logUser.name,
            email: logUser.email,
            pic: logUser.pic || "/img/user-icon.png",
            address: logUser.address || "N/A Address"
        }
        const newListings = await listing.find({sellerId: tokenId}).sort({sold: false});
        res.render('profile', {title: "Profile", id: tokenId, info, newListings});
    } else {
        const logUser = await User.findOne({_id: tokenId});
        const info = {
            name: logUser.name || "",
            email: logUser.email || "",
            pic: logUser.pic || "/img/user-icon.png",
            address: logUser.address || "N/A"
        };
        res.render('badpage', {title: "Error 404", id: tokenId, info});
    }
}

const user_sell = async (req, res) => {
    try {
        const upload_type = req.body.upload;
        let image_public_id = "";
        let image_url = "";
        if(upload_type == "opt2"){
            if(req.file){
                await streamUploadToPosts(req)
                .then((response) => {
                    image_public_id = response.public_id;
                    image_url = response.secure_url;

                    console.log(`\nSuccess in uploading the image.`);
                    console.log(response);
                })
                .catch((error) => {
                    console.log(`\nError in uploading the image.`);

                    res.status(error.http_code ?? 400).send(error);

                    // Re-throw the error to prevent the execution
                    // of the SQL query.
                    throw error;
                });
            }
        }

        const newListing = new listing({
            pic: upload_type === "opt1" ? req.body.image_file : image_url,
            category: req.body.category,
            tag: req.body.tag,
            title: req.body.title,
            condition: req.body.condition,
            price: parseInt(req.body.price),
            description: req.body.description,
            brand: req.body.brand,
            morethanOne: req.body.morethanOne==='true',
            allowSms: req.body.allowSms==='true',
            meetup: req.body.meetup,
            deliver: req.body.deliver,
            sellerId: req.getUser.id,
            sold: false
        });
        await newListing.save();

        console.log("testing1");
        return res.redirect(`/user/profile/${req.getUser.id}`);
    } catch (error) {
        console.log(error);
    }
}

const user_sell_view = async (req, res) => {
    const tokenId = req.getUser.id || "";
    const logUser = await User.findOne({_id: tokenId});
    const info = {
        name: logUser.name || "",
        email: logUser.email || "",
        pic: logUser.pic || "/img/user-icon.png",
        address: logUser.address || "N/A"
    };
    res.render('sell', {title: "Sell", id: tokenId, info});
}

module.exports = {
    user_add,
    user_login,
    user_profile,
    user_sell,
    user_sell_view
}