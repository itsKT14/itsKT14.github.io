const User = require('../models/userModel');
const listing = require('../models/listingModel');
const checkDate = require('../utils/checkDate');
const {getName, getPic, getAddress} = require('../utils/checkUser');

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
    
    const newListings = await listing.find({title: {$regex: search, $options: 'i'}} && {sold: false})
    .limit(limit)
    .skip(page*limit);
    const items = [];
    for(let product of newListings) {
        const obj = {
            id: product._id,
            category: product.category,
            tag: product.tag,
            pic: product.pic,
            title: product.title,
            condition: product.condition,
            price: product.price,
            description: product.description,
            brand: product.brand,
            morethan: product.morethan,
            allowSms: product.allowSms,
            meetup: product.meetup,
            deliver: product.deliver,
            sellerId: product.sellerId,
            date: checkDate(product.createdAt),
            sellerName: await getName(product.sellerId),
            sellerPic: await getPic(product.sellerId)
        }
        items.push(obj)
    }
    res.render('home', {title:"Home", id: tokenId, info, items});
}

const settings_page = async (req, res) => {
    const tokenId = req.getUser.id || "";
    const logUser = await User.findOne({_id: tokenId});
    const info = {
        name: logUser.name || "",
        email: logUser.email || "",
        pic: logUser.pic || "/img/user-icon.png",
        address: logUser.address || "",
        phone: logUser.phone,
        showPic: logUser.pic || ""
    };
    res.render('settings', {title:"Settings", id: tokenId, info});
}

const settings_edit = async (req, res) => {
    const userId = req.params.id;
    const editUser = await User.findByIdAndUpdate(userId, {
        pic: req.body.pic,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
    });
    if(!editUser){
        return res.status(404).send(`User can't be updated`);
    }
    res.redirect(`/user/profile/${req.getUser.id}`);
}

const item_page = async (req, res) => {
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
    const itemId = req.params.id;
    const item = await listing.findOne({_id: itemId});
    item.brand = item.brand==""?"N/A":item.brand;

    const seller = await User.findOne({_id: item.sellerId});
    seller.brand = seller.brand==""?"N/A":seller.brand;
    seller.address = seller.address==""?"N/A":seller.address;
    seller.pic = seller.pic==""?"/img/user-icon.png":seller.pic;

    res.render('item', {title:"Item", id: tokenId, info, item, seller});
}

const item_edit_page = async (req, res) => {
    const tokenId = req.getUser.id || "";
    const logUser = await User.findOne({_id: tokenId});
    const info = {
        name: logUser.name || "",
        email: logUser.email || "",
        pic: logUser.pic || "/img/user-icon.png",
        address: logUser.address || "N/A"
    };

    const paramId = req.params.id;
    const item = await listing.findOne({_id: paramId});

    res.render('edit_item', {title: "Edit Item", id: tokenId, info, item});
}

const item_edit = async (req, res) => {
    try {
        paramId = req.params.id;
        const editListing = await listing.findByIdAndUpdate(paramId, {
            pic: req.body.pic,
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
        if(!editListing){
            return res.status(404).send(`Item can't be updated`);
        }
        res.redirect(`/user/profile/${req.getUser.id}`);
    } catch (error) {
        console.log(error);
    }
}

const item_sold = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await listing.findOne({_id: itemId});
        const status = item.sold===true?false:true;
        const editListing = await listing.findByIdAndUpdate(itemId, {
            sold: status
        });
        if(!editListing){
            return res.status(404).send(`Listing can't be updated`);
        }
        res.redirect(`/user/profile/${req.getUser.id}`);
    } catch (error) {
        console.log(error);
    }
}

const item_delete = async (req, res) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await listing.findByIdAndDelete(itemId);
        
        if(!deletedItem){
            return res.status(404).send(`Listing can't be deleted`);
        }
        res.redirect(`/user/profile/${req.getUser.id}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    home_page,
    settings_page,
    settings_edit,
    item_page,
    item_edit_page,
    item_edit,
    item_sold,
    item_delete
}