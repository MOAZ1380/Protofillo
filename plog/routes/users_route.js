const express = require('express');
const user_controler = require('../controler/User_controller');

const router = express.Router()

router.route('/register')
    .post(user_controler.user_register)

router.route('/login')
    .post(user_controler.user_login)


module.exports = router;