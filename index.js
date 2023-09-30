const express = require("express");
const expresslayouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload")
const session = require("express-session");
const cookieParser = require('cookie-parser');
const flash = require("express-flash");
const { NotFound } = require("./server/middelwares/errors")
const { errorHandler } = require("./server/middelwares/errors")
const Port = require("./configport/port")

const app = express();

const { connect } = require("./configdb/db")
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(expresslayouts);
app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret: 'CookingBlogSecretSession',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());
app.set('layout', './layouts/main');
app.set('view engine', 'ejs')
const routes = require("./server/routes/recipeRoutes.js")
const { routerauth } = require("./server/routes/authRoutes")
app.use('/', routes)
app.use('/', routerauth)

/**
 * app login
 */
app.get("/login", async(req, res) => {
    res.render("LOGIN2")
})
app.get("/register", async(req, res) => {
    res.render("REGISTER2")
})
app.get("/password", async(req, res) => {
    res.render("password")
})
app.use(NotFound)
app.use(errorHandler)
    // //error handler meddelwaers
const port = process.env.PORT || 8000;
console.log(port)

app.listen(port, () => console.log(`server start at port ${port}`));

//connection mongo
connect();