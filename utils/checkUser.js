const User = require('../models/userModel');

const getName = async (id) => {
    if(id) {
        const logUser = await User.findOne({_id: id});
        return logUser.name;
    }
}

const getPic = async (id) => {
    if(id) {
        const logUser = await User.findOne({_id: id});
        const pic = logUser.pic || "/img/user-icon.png";
        return pic;
    }
}

const getAddress = async (id) => {
    if(id) {
        const logUser = await User.findOne({_id: id});
        const address = logUser.address || "N/A Address";
        return address;
    }
}

module.exports = {
    getName,
    getPic,
    getAddress
};