const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

//verifytoken
function verifyToken(req, res, next) {
    let user = User.findOne({ email: req.body.email });
    console.log(user.token)
    const token = user.token;
    if (token) {

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decode;
            next();
        } catch (error) {
            res.render("invalidtoken");
        }


    } else {
        res.render("notoken");

    }

};

//verifytoken & autherization
function verifyTokenandautherization(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json(`you are not allowed, you only can update your profile`);
        }

    })
}
//verifytoken & admin
function verifyTokenandadmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            console.log(req.user.isAdmin)

            next();
        } else {
            res.res.render("onlyadmin");
        }

    })
}
module.exports = {
    verifyToken,
    verifyTokenandautherization,
    verifyTokenandadmin
}