const _ = require('lodash')
const db = require('../models')
const User = db.users;
const bcrypt = require('bcryptjs')

async function create(req,res,next){
    const hashPass = await bcrypt.hash(req.body.password,10)      
        let post={
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: hashPass
        }
        User.create(post).then(data=>{
            res.send(post)
        }).catch(err => {
            res.status(500).send({
                message: "error in register"
            })
        })
        res.redirect('/user/login')
}

module.exports ={
    create,
}