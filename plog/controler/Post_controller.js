const Post = require('../models/Posts_Schema');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const http_status = require('../utils/http_status');


const add_post = async (req, res, next) => {
    try{
        const { title, content } = req.body;
        const userId = req.user.id;
        if(!title || !content){
            return res.status(400).json({
                message: "title and content required",
                status_code: 400,
                status_text: http_status.FAIL,
            });
        }

        const old_title = await Post.findOne({ title });
        if(old_title){
            return res.status(400).json({
                message: "This title is already taken, please choose another one.",
                status_code: 400,
                status_text: http_status.FAIL,
            });
        }

        if (title.length < 5 || title.length > 100) {
            return res.status(400).json({
                message: "Title must be between 5 and 100 characters long",
                status_code: 400,
                status_text: http_status.FAIL,
            });
        }

        if (content.length < 5 || content.length > 5000) {
            return res.status(400).json({
                message: "Content must be between 5 and 5000 characters long",
                status_code: 400,
                status_text: http_status.FAIL,
            });
        }

        const newPost = new Post({
            title,
            content,
            user: userId
        });
        await newPost.save();
        const user = await User.findById(userId);
        user.posts.push(newPost._id);
        await user.save();
        
        res.status(201).json({
            status: http_status.SUCCESS,
            data: { post: newPost },
        });


    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            status_code: 500,
            status_text: http_status.FAIL,
            error: err.message,
        });
    }
};




const get_all_post = async (req, res, next) => {
    try{
        // inInfinite Scroll
        const { page = 1, page_size = 10 } = req.query;
        const skip  = (page - 1) * page_size;

        const posts = await Post.find()
        .skip(skip)
        .limit(Number(page_size))
        .exec();

        res.status(200).json({
            status: http_status.SUCCESS,
            data: posts,
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            status_code: 500,
            status_text: http_status.FAIL,
            error: err.message,
        });
    }
};

module.exports = {
    add_post,
    get_all_post,
}