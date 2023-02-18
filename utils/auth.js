const jwt = require('jsonwebtoken');
module.exports = function(req, res, next){
    const token = req.cookies.token;
    const page = req.cookies.page || "";
    if(!token && page!=="home" && page!=="") return res.redirect('/user/login');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.getUser = verified;
        next();
    } catch (error) {
        //res.status(500).send('server issue');
        // console.log("No token or token expired");
        req.getUser = {name: ""};
        if(page!=="home" && page!=="") return res.redirect('/user/login');
        next();
    }
}