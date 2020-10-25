const mongoose = require("mongoose");


let Review = new mongoose.Schema({
    album: {
        type: String,
        required: true
    },
    artists: {
        type: [String]
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
    }
});

var reviewModel = mongoose.model('Review', Review);
module.exports = reviewModel;