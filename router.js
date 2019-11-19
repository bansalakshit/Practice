const express = require('express')
const router = express.Router()
const register = require('./controllers/registerController');
const login = require('./controllers/loginController');
const mail = require('./controllers/mailController');
const otpVerify = require('./controllers/otpVerifyController')
const mgs = require('./controllers/chatController')
const read = require('./controllers/fs')
const upload = require('./controllers/upload')

router.post('/register', register.signup);
router.post('/login', login.check);
router.post('/mail', mail.send);
router.post('/otpVerify', otpVerify.controller);
router.post('/chat', mgs.chat);
router.post('/read', read.read);
router.post('/upload', upload.single("img"));

module.exports = router;