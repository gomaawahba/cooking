const asynchandler = require("express-async-handler");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ValideRegisteruser, ValideRegisteruserpassword } = require("../models/User");
const { ValideLoginuser } = require("../models/User");


/**
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 */
exports.Register = asynchandler(async(req, res) => {
    const { username, email, password } = req.body;
    let errors = [];
    console.log(req.body.username);
    console.log(req.body.password);
    console.log(req.body.email);

    const { error } = ValideRegisteruser(req.body);
    if (error) {
        errors.push({ msg: 'Please enter all fields' });
        res.render('REGISTER2', {
            errors
        });
    }
    //check password length

    //check email in database or Not 
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('REGISTER2', {
            errors
        });
    }
    //salt
    const slat = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, slat)
    user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        // isAdmin: req.body.isAdmin
    });
    await user.save();
    res.redirect("login")
});


exports.Login = asynchandler(async(req, res) => {

    try {
        console.log(req.body.email);
        console.log(req.body.password);

        const { error } = ValideLoginuser(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        //check email in database or Not 
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json(`Invalide Email or Password`);
        }
        //check password  by methode compare in bcrypt
        const ispasswordmatch = await bcrypt.compare(req.body.password, user.password);
        if (!ispasswordmatch) {
            return res.status(400).json(`Invalide Email or Password`);
        }

        res.redirect("/")

    } catch (error) {
        res.status(500).send({ message: `Error Occured` });
    }


});


/**
 *  <% for( let index = 0; index < errors.length; index++ ) { %>

                                        <% } %>
 */