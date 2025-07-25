const express = require('express');
const router = express.Router();
const {SignUp,Login} = require('../controllers/user.controller')
const verifyJwt = require("../middlewares/auth")

router.route('/SignUp').post(SignUp)
router.route('/Login').post(Login)


module.exports = router;