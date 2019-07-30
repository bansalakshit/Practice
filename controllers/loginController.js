const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = {};

login.check = (req , res) => {
    if(!req.body.username || !req.body.password){
        if(!req.body.email || !req.body.password){
            res.status(200).send('Incomplete Arguements..');
            console.log('Incomplete Arguements');
        }
        else{
            let email = req.body.email;
            // const token1 = req.headers.token
            // console.log("header:",req.headers.token)
            user.findOne({email : email},(err,data2) => {
                if(err){
                    res.status(400).send('Email Error..')
                }else{
                    if(!data2){
                        res.send('User not exist(Email)..')
                    }
                    else{
                        if(data2){
                            bcrypt.compare(req.body.password , data2.password , (err , data4) => {
                                if(err){
                                    res.send('Bcrypt-Email-password Error..')
                                }
                                else{
                                    if(data4 == false){
                                        res.send('Wrong Password(Email).. ')
                                    }
                                    else{
                                        const expiry = 60 * 24 * 60 * 60;
                                        // const expiresOn = Date.now() + (expiry * 1000)
                                        const token = jwt.sign({
                                            _id: data4._id, name: data4.username
                                        },
                                            "qwertyui", {
                                                algorithm: 'HS384',
                                                expiresIn: expiry,
                                                issuer: 'admin'
                                            });
                                            console.log(token)
                                            res.status(200).send('Login Successfully(Email)..');
                                        // jwt.verify(token1 , 'qwertyui' , (err , result)=> {
                                        //     if(err){
                                        //         console.log('Token not verified..')
                                        //         res.status(301).send('Token not verified..')
                                        //     }
                                        //     else{
                                        //         console.log('Login Successfully(Email)..')
                                        //         res.status(200).send('Login Successfully(Email)..');
                                        //     }
                                        // }) 
                                    }
                                }
                            })
                        }
                    }
                }
            })
        }  
    }
    else{
        let username = req.body.username;
        user.findOne({username : username},(err,data1)=>{
            if(err){
                res.send('Username Error..')
            }else{
                if(!data1){
                    res.send('User not exist(Username)..')
                }
                else{
                    if(data1){
                        bcrypt.compare(req.body.password , data1.password , (err , data5) => {
                            if(err){
                                res.send('Bcrypt-Username-password Error..')
                            }
                            else{
                                if(data5 == false){
                                    res.send('Wrong Password(Username).. ')
                                }
                                else{
                                    // jwt.verify(token , 'qwertyui' , (err , result)=> {
                                    //     if(err){
                                    //         console.log('Token not verified..')
                                    //         res.status(301).send('Token not verified..')
                                    //     }
                                    //     else{
                                    //         console.log('Login Successfully(Username)..')
                                    //         res.status(200).send('Login Successfully(Username)..');
                                    //     }
                                    // })
                                    res.status(200).send('Login Successfully(Username)..');
                                }
                            }
                        })
                    }
                }
            }
        })
    }
}

module.exports = login;