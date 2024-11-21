const mongoose = require('mongoose');

const User_Schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        enum: ['male', 'female'],       // Must be either 'male' or 'female'
        required: true ,
    },
    photo: {
        type: String,
        default: '../uploads/profile.jpg'      // Default profile picture
    },
    createdAt: {
        type: Date,
        default:  Date.now           // Automatically sets the creation date
    },
    birthDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        unique: true,               // Email must be unique
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    posts: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', 
    }]
});

module.exports = mongoose.model("User", User_Schema);