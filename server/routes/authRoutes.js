const express = require("express");
const routerauth = express.Router();
const authController = require("../controllers/authcontroller");


routerauth.post('/register', authController.Register);
routerauth.post('/login', authController.Login);





module.exports = {
    routerauth
}