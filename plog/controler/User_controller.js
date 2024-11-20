const User = require('../models/Users_Schema');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const http_status = require('../utils/http_status');

const user_register = async (req, res, next) => {
    try {
        const { firstName, lastName, sex, birthDate, email, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid email",
                status_code: 400,
                status_text: http_status.FAIL,
            });
        }

        const old_user = await User.findOne({ email });
        if (old_user) {
            return res.status(400).json({
                message: "User already exists",
                status_code: 400,
                status_text: http_status.FAIL,
            });
        }

        const validDate = new Date(birthDate);
        if (isNaN(validDate.getTime())) {
            return res.status(400).json({
                message: "Invalid birth date",
                status_code: 400,
                status_text: http_status.FAIL,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const new_user = new User({
            firstName,
            lastName,
            sex,
            birthDate: validDate,
            email,
            password: hashedPassword,
        });

        await new_user.save();

        res.status(201).json({
            status: http_status.SUCCESS,
            data: { user: new_user },
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

const user_login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                status_code: 400,
                status_text: http_status.FAIL,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status_code: 404,
                status_text: http_status.FAIL,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
                status_code: 401,
                status_text: http_status.FAIL,
            });
        }

        res.status(200).json({
            status: http_status.SUCCESS,
            data: { message: "Login successful" },
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
    user_register,
    user_login,
};
