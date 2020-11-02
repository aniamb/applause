
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

let User = new mongoose.Schema({
    handle: {
        type: String,
        required: false
    },
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
    visibility: {
        type: String,
        required: true
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
    followers:{ 
        type: [String]
    },
    following:{
        type: [String]
    },
    favorites: {
        type: [String]
    },
    groups: {
        type: [String]
    },
    meta_data: {
        type: String
    }
});
var userModel = mongoose.model('User', User);
module.exports = userModel;
