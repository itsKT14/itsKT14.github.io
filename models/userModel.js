const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const User = mongoose.model("USER", userSchema);
module.exports = User;