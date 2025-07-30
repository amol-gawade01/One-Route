const express = require('express');
const router = express.Router();
const {SignUp,Login,Logout, getUser} = require('../controllers/user.controller')
const verifyJwt = require("../middlewares/auth")

router.route('/SignUp').post(SignUp)
router.route('/Login').post(Login)
router.route('/Logout').get(verifyJwt,Logout)
router.route('/userInfo').get(verifyJwt,getUser)


module.exports = router;