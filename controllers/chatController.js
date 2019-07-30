const chat = require('../models/chat')
const user = require('../models/user')

const mgs = {}

mgs.chat = (req , res) => {
    const username = req.body.username
    
    user.findOne({username: username} , (err , data) => {
        if(err){
            res.status(301).send(err)
        }
        else{
            if(data){
                let obj = {
                    msg: req.body.msg
                }
                let userData = new chat(obj)
                userData.save((err , result) => {
                    if(err){
                        res.status(301).send(err)
                    }
                    else{
                        if(result){
                            res.status(200).send('Msg send..')
                        }
                    }
                })
            }
        }
    })
}

module.exports = mgs