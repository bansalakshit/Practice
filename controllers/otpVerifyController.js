const user = require('../models/user');

const otpVerify = {};

otpVerify.controller = (req , res) => {
    var token = req.body.token;
    user.findOne({token: token} , (err , data) => {
        if(err){
            console.log('Token Error');
            res.status(400).send('Token Error');
        }
        else{
            if(!data){
                console.log('Token not found');
                res.send('Token not found');
            }
            else{
                var token1 = data.token;
                console.log(token1);
            
                if(token != token1){
                    console.log('Invalid OTP..');
                    res.send('Invalid OTP..');
                }
                else{
                    console.log('OTP verification successful..');
                    res.send('OTP verification successful..');
                }
            }
        }
    })   
}

module.exports = otpVerify;