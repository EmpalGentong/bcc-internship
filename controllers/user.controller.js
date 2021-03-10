const _ = require('lodash')
const db = require('../models')
const User = db.users;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

async function create(req,res,next){
    const hashPass = await bcrypt.hash(req.body.password,10)      
        let post={
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone:req.body.phone,
            username: req.body.username,
            password: hashPass
        }
        User.create(post).then(data=>{
            let payload = {
                id: data.id,
                username: data.username
            }
            const token = jwt.sign(payload, process.env.JWT_TOKEN)
            return res.status(200).send({ token })            
        }).catch(err => {
            res.status(500).send({
                message: "error in register"
            })
        })
}

function login(req, res, next) {
    User.findOne({
        where: {
            username: req.body.username
        },
    })
        .then(user => {
            if (!user) return next("User with given username is not found.")
            // Need sync with bcryptjs
            const isValid = bcrypt.compareSync(req.body.password, user.password)
            if (!isValid) {
                return next({
                    statusCode: 401,
                    message: "Username or Password doesn't match with existing resource."
                })
            }
            // If Valid
            let payload = {
                id: user.id,
                username: user.username
            }
            const token = jwt.sign(payload, process.env.JWT_TOKEN)
            return res.status(200).send({ token })
            
        })
        .catch(err => {
            return next(err)
        })
}

module.exports ={
    create,
    login,
}