const mongoose = require('mongoose');

const Post_Schema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [5, "Title must be at least 5 characters long"],
        maxlength: [100, "Title must not exceed 100 characters"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        minlength: [5, "Content must be at least 5 characters long"],
        maxlength: [5000, "Content must not exceed 5000 characters"],
    },
    created_at: {
        type: Date,
        default: Date.now           
    },
    updated_at: {
        type: Date,
        default: Date.now           
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

module.exports = mongoose.model("Post", Post_Schema);