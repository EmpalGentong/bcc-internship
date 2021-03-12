const _ = require('lodash')
const db = require('../models')
const profile = db.bio;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function updates(req,res,next){
    let token = req.headers.authorization
    token = token.split(' ')[1]
    let payload = jwt.decode(token)
    profile.update(req.body, {
        where: { id: payload.id }
    }).then(num =>{
            if (num == 0) {
                return next({
                    statusCode: 404,
                    message: "Bio is not updated yet"
                })
            }
            return res.status(200).send({
                status:"Success",
                message:"Pembaruan Berhasil",
                data:{}
            })
    })
}

function showBio(req,res,next){
    let token = req.headers.authorization
    token = token.split(' ')[1]
    let payload = jwt.decode(token)
    profile.update(req.body, {
        
    })
}

module.exports={
    updates
}