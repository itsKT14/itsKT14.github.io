const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    brand: {
        type: String
    },
    morethanOne: {
        type: Boolean,
        required: true
    },
    allowSms: {
        type: Boolean,
        required: true
    },
    meetup: {
        type: String
    },
    deliver: {
        type: String
    },
    sellerId: {
        type: String,
        required: true
    }
}, {timestamps: true});

const listing = mongoose.model("listing", userSchema);
module.exports = listing;