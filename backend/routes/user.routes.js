const express = require('express');
const router = express.Router();
const {SignUp,Login,Logout, getUser} = require('../controllers/user.controller')
const {verifyJwt} = require('../middlewares/auth')

router.route('/Signup').post(SignUp)
router.route('/login').post(Login)
router.route('/Logout').get(Logout)
router.route('/userInfo').get(verifyJwt,getUser)


module.exports = router;