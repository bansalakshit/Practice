const express = require('express')
const router = express.Router()
const register = require('./controllers/registerController');
const login = require('./controllers/loginController');
const mail = require('./controllers/mailController');
const otpVerify = require('./controllers/otpVerifyController')
const mgs = require('./controllers/chatController')

router.post('/register', /* decodedToken,  */register.signup);
router.post('/login', login.check);
router.post('/mail', mail.send);
router.post('/otpVerify', otpVerify.controller);
router.post('/chat', mgs.chat);
// decodedToken((req, res) => {
//     // let result= // jwt verify
//     // req.body.decodecToken=result
//     callback()
// })
module.exports = router;