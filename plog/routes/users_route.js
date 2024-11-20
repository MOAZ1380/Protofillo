const express = require('express');
const usercontroler = require('../controler/User_controller');

const router = express.Router()

router.route('/register')
    .post(usercontroler.user_register)

router.route('/login')
    .post(usercontroler.user_login)


module.exports = router;