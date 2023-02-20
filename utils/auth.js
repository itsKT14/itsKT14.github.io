const jwt = require('jsonwebtoken');

const homePageAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.getUser = verified;
        next();
    } catch (error) {
        req.getUser = {name: ""};
        next();
    }
}

const otherPageAuth = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.redirect('/user/login');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.getUser = verified;
        next();
    } catch (error) {
        return res.redirect('/user/login');
    }
}

module.exports = {
    homePageAuth,
    otherPageAuth
}
