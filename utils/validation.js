const joi = require("joi");
const User = require('../models/userModel');

const userValidation = joi.object({
    name: joi.string().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required()
});

const loginValidation = joi.object({
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required()
});

const isExisting = async (inputEmail) => {
    const email = await User.findOne({email: inputEmail}); 
    if(email) {
        error = `${inputEmail} is already exist!`;
        return error;
    }
}

module.exports = {
    userValidation,
    loginValidation,
    isExisting
}