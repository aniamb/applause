const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types


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
        type: [String]
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
        type: String,
    },
    albumId: {
        type: Number,
    },
    releaseDa: {
        type: String,
    }
});

var reviewModel = mongoose.model('Review', Review);
module.exports = reviewModel;