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
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    reviews: {
        type: [String]
    },
    followers: {
        type: [User]
    },
    following: {
        type: [User]
    },
    favorites: {
        type: [String]
    },
    groups: {
        type: [String]
    }

});