const jwt = require('jsonwebtoken');
const http_status = require('../utils/http_status');
const User = require('../models/Users_Schema'); 

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];

    if (!authHeader) {
        return res.status(400).json({
            message: "Token is required",
            status_code: 400,
            status_text: http_status.FAIL,
        });
    }
    const token = authHeader.split(' ')[1];  // del "Bearer"
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);
        
        const user = await User.findOne({ email: decodedToken.email });
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status_code: 404,
                status_text: http_status.FAIL,
            });
        }
        
        req.user = decodedToken;
        next();
    } catch (err) {
        console.error(err); 
        return res.status(401).json({
            message: "Invalid token",
            status_code: 401,
            status_text: http_status.ERROR,
            error: err.message,
        });
    }
};

module.exports = verifyToken;
