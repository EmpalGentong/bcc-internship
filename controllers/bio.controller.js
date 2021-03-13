const _ = require('lodash')
const db = require('../models')
const profile = db.bio;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


function create(req,res,next){
    let token = req.headers.authorization
    token = token.split(' ')[1]
    let payload = jwt.decode(token)
    profile.create({
        bidang: req.body.bidang,
        deskripsiDiri: req.body.deskripsiDiri,
        website: req.body.website,
        userId: payload.id
    })
    .then(data => {
        return res.status(201).send({
            status:"Success",
            message:"bio created succesfully",
            data:{}
        })
    })
    .catch(err =>{
        res.send(err)
    })
}
function updates(req,res,next){
    let token = req.headers.authorization
    token = token.split(' ')[1]
    let payload = jwt.decode(token)
    profile.update(req.body, {
        where: profile.userId === payload.id
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
    }).catch(err =>{
        res.send(err)
    })
}

function showBio(req,res,next){
    let condition = {
        userId: req.user.id
    }
    profile.findOne(req.body, {
        where: condition
    }).then(data=>{
        if(data == null ){
            res.json({
                message: "desain tidak ditemukan"
            })
            return;
        }
        res.send({data})
    }).catch()
}

module.exports={
    updates,
    create,
    showBio
}