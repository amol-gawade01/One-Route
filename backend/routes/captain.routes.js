const express = require('express');
const router = express.Router();
const {verifyJwtCap} = require('../middlewares/auth')

const {registerCaptain,loginCaptain, getCaptainProfile,logoutCaptain} = require('../controllers/captain.controller');

router.route('/register').post(registerCaptain)
router.route('/login').post(loginCaptain)
router.route('/profile').get(verifyJwtCap,getCaptainProfile)
router.route('/logout').get(verifyJwtCap,logoutCaptain)
module.exports = router;