const User = require('../models/userModel');
const listing = require('../models/listingModel');
const checkDate = require('../utils/checkDate');

const home_page = async (req, res) => {
    const tokenId = req.getUser.id || "";
    let info = {
        name: "",
        email: "",
        pic: "",
        address: ""
    };
    if(tokenId) {
        const logUser = await User.findOne({_id: tokenId});
        info = {
            name: logUser.name || "",
            email: logUser.email || "",
            pic: logUser.pic || "/img/user-icon.png",
            address: logUser.address || "N/A"
        };
    }

    const search = req.query.search || "";
    const page = parseInt(req.query.page) -1 || 0;
    const limit = parseInt(req.query.limit) || 20;
    const total = await listing.countDocuments({
        title: {$regex: search, $options: 'i'}
    });
    //paging
    let NumOfPage = parseInt(total/limit);
    (total%limit)!=0?NumOfPage++:'';
    const startOfPage = (page+1) == 1 ? "1" : (limit*page)+1;
    const endOfPage = (page+1) * limit <= total ? (page+1) * limit : total;
    
    const newListings = await listing.find({title: {$regex: search, $options: 'i'}})
    .limit(limit)
    .skip(page*limit);

    res.render('home', {title:"Home", id: tokenId, info, newListings, checkDate});
}

const settings_page = async (req, res) => {
    const tokenId = req.getUser.id || "";
    const logUser = await User.findOne({_id: tokenId});
    const info = {
        name: logUser.name || "",
        email: logUser.email || "",
        pic: logUser.pic || "/img/user-icon.png",
        address: logUser.address || "N/A"
    };
    res.render('settings', {title:"Settings", id: tokenId, info});
}

module.exports = {
    home_page,
    settings_page
}