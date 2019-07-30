const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let register = {};

register.signup = async (req, res) => {
    if (!req.body.name || !req.body.username || !req.body.email || !req.body.password || !req.body.confirmPassword) {
        res.status(200).send('Incomplete Details..');
    }
    else {
        user.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }, (err, client) => {
            if (err) {
                res.status(400).send(err)
            }
            else {
                if (client) {
                    console.log('User already exists');
                    res.status(301).send({ error: "User already exists" });
                } else {

                    let obj = {
                        name: req.body.name,
                        username: req.body.username,
                        email: req.body.email,
                    }
                    const saltRounds = 10;
                    const password = req.body.password;
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) {
                                res.status(301).send({ error: err.message })
                            }
                            else {
                                obj.password = hash;
                                let userData = new user(obj)

                                userData.save((err1, data) => {
                                    if (err1) {
                                        res.status(301).send({ error: err1.message })
                                        console.log('firstController Error...');
                                    }
                                    else {
                                        if(data){
                                            res.status(200).send('Register Successfully..')
                                        }
                                        // const expiry = 60 * 24 * 60 * 60;
                                        // const expiresOn = Date.now() + (expiry * 1000)
                                        // const token = jwt.sign({
                                        //     _id: data._id, name: data.username
                                        // },
                                        //     "qwertyui", {
                                        //         algorithm: 'HS384',
                                        //         expiresIn: expiry,
                                        //         issuer: 'admin'
                                        //     });
                                        // res.status(200).send({ data: { user: data, token: token, expiresOn: expiresOn } });
                                    }
                                })
                            }
                        })
                    })
                }
            }
        })
    }
}
module.exports = register;

    // try {
    //     if (!req.body.name || !req.body.username || !req.body.email || !req.body.password) {
    //         res.status(200).send('Incomplete Details..');
    //     } 
    //     else {
    //         let userinfo = await user.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
    //         if (userinfo) {
    //             res.status(301).send({ error: "User already exists" });
    //         } 
    //         else {
    //             let obj = {
    //                 name: req.body.name,
    //                 username: req.body.username,
    //                 email: req.body.email,
    //             }
    //             let pass = await bcrypt.hash(req.body.password, 10);
    //             obj.password = pass;
    //             let userData = new user(obj);
    //             let data = await userData.save();
    //             const expiry = 60 * 24 * 60 * 60;
    //             const expiresOn = Date.now() + (expiry * 1000)
    //             const token = jwt.sign({
    //                 _id: data._id, name: data.username
    //             },
    //                 "insync", {
    //                     algorithm: 'HS384',
    //                     expiresIn: expiry,
    //                     issuer: 'admin'
    //                 });
    //             res.status(200).send({ data: { user: data, token: token, expiresOn: expiresOn } });
    //         }
    //     }
    // } catch (error) {
    //     console.log("in catch=", error.message)
    // }