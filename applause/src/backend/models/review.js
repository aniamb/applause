const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

var comments = new mongoose.Schema({
    commenter: String,
    comment: String,
    date: {type: Date, default:Date.now},
    profilePic: String
});

let Review = new mongoose.Schema({
    album: {
        type: String,
        required: true
    },
    artist: {
        type: String
    },
    image: {
        type: String
    },
    rating: {
        type: Number
    },
    likes: {
        type: Number
    },
    comments: {
        type: [comments]
    },
    username: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    private: {
        type: Boolean
    },
    time: {
        type: Date,
    },
    users_liked: {
        type:[String]
    },
    albumId: {
        type: Number
    }
});

var reviewModel = mongoose.model('Review', Review);
module.exports = reviewModel;