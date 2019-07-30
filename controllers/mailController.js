const nodemailer = require('nodemailer');
const user = require('../models/user')
const crypto = require('crypto');

const mail = {}

mail.send = (req , res) => {
  var email = req.body.email;
  console.log(email);
  
  if(!email){
    console.log('Incomplete arguements..');
    res.send('Incomplete arguements..');
  }
  else{
    var otp = crypto.randomBytes(3).readUIntBE(0 , 3);
    user.findOne({email: email} , (err , abc) => {
      if(err){
        console.log('Email not found..');
        res.status(400).send('Email not found..');
      }
      else{
        abc.token = otp
        abc.tokenExpires = Date.now() + 60
        abc.save((err , result) => {
          if(err){
            console.log('UserToken error..');
            res.send(400).send('UserToken error..')
          }
          else{
            console.log('UserToken saved..');
          }
        })
      }
    })
  }

  var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: 'aakshitbansal4321@gmail.com',
        pass: '@kshitban'
      },
      tls: {
        rejectUnauthorised: false
      }
  });
      
  var mailOptions = {
    from: 'aakshitbansal4321@gmail.com',
    to: '',
    subject: 'Sending Email using Node.js',
    html: '<p>Do not share this otp with anyone.</p></br><p>Your otp is: ' + otp + '</p>'
  };

  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
      res.send(err)
    } 
    else {
      console.log('Email sent to the user.');
      res.send('Email sent to the user.')
    }
  });
}

module.exports = mail;