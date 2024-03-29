const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    pic: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tag: {
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
    },
    sold: {
        type: Boolean,
        required: true
    }
}, {timestamps: true});

const listing = mongoose.model("listing", userSchema);
module.exports = listing;