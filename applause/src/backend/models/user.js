
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
        type: String
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
    private_reviews: {
        type: [String]
    },
    public_reviews: {
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
    listen_later: {
        type: [Array]
    },
    review_later: {
        type: [Array]
    },
    meta_data: {
        type: String
    }
});
var userModel = mongoose.model('User', User);
module.exports = userModel;