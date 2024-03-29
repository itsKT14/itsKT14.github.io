const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
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
        type: Number
    }
}, {timestamps: true});

const User = mongoose.model("USER", userSchema);
module.exports = User;