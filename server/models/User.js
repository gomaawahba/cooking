const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
//user schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    },

}, { timestamps: true });
//generate token
UserSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY);
}

//User Model
const User = mongoose.model("User", UserSchema);
//validate Register User
let ValideRegisteruser = (Obj) => {
    const Schema = Joi.object({
        email: Joi.string().trim().min(3).max(200).required().email(),
        username: Joi.string().trim().min(3).max(200).required(),
        password: Joi.string().trim().min(6).required(),
    });
    return Schema.validate(Obj)
}

//validate login User
let ValideLoginuser = (Obj) => {
        const Schema = Joi.object({
            email: Joi.string().trim().min(3).max(200).required().email(),
            password: Joi.string().trim().min(6).required(),
        });
        return Schema.validate(Obj)
    }
    //validate Updata User
let ValideUpdatauser = (Obj) => {
    const Schema = Joi.object({
        email: Joi.string().trim().min(3).max(200).email(),
        username: Joi.string().trim().min(3).max(200),
        password: Joi.string().trim().min(6),
        // isAdmin: Joi.bool()
    });
    return Schema.validate(Obj)
}


module.exports = {
    User,
    ValideRegisteruser,
    ValideLoginuser,
    ValideUpdatauser,
}