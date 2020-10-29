const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types


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
    user: {
        type: String,
        required: true
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