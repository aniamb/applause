
const mongoose = require("mongoose");

let User = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    handle: {
        type: String,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    reviews: {
        type: [String]
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    favorites: {
        type: [String]
    },
    groups: {
        type: [String]
    }

});
var userModel = mongoose.model('User', User);
module.exports = userModel;