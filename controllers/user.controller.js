const _ = require('lodash')
const db = require('../models')
const User = db.users;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function create(req,res,next){
    User.create(req.body)
    .then(data => {
        let payload = {
            id: data.id,
            username: data.username
        }
        const token = jwt.sign(payload, process.env.JWT_TOKEN,{expiresIn: 86400})
        return res.status(201).send({
            status:"Success",
            message:"user registered succesfully",
            data:{token: token}
        })
    })
    .catch(err => {
        if (err.name == 'SequelizeUniqueConstraintError') {
            const failResponse = {
                success: 'false',
                error: {
                    // Fetch
                    details: _.map(err.errors, ({ message, type }) => ({
                        message:"email yang dipakai telah digunakan",
                    }))
                }
            };
            // console.log(failResponse.error)
            return res.status(422).send(failResponse)
        }
        return next(err)
    })
}

function login(req, res, next) {
    User.findOne({
        where: {
            email: req.body.email
        },
    })
        .then(User => {
            if (!User) return next("User with given email is not found.")
            // Need sync with bcryptjs
            const isValid = bcrypt.compareSync(req.body.password, User.password)
            if (!isValid) {
                return next({
                    statusCode: 401,
                    message: "Username or Password doesn't match with existing resource."
                })
            }
            // If Valid
            let payload = {
                id: User.id,
                username: User.username
            }
            const token = jwt.sign(payload, process.env.JWT_TOKEN)
            return res.status(201).send({
                status:"Success",
                message:"login success",
                data:{token: token}
            })
            
        })
        .catch(err => {
            return next(err)
        })
}


function findAll(_, res, next) {
    User.findAll()
        .then(users => {
            res.status(200).send({ users })
        }
        )
        .catch(err => {
            return next(err)
        })
}

function findOne(req, res, next) {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    let payload = jwt.decode(token)
    const id = payload.id
    User.findAll({
        where: {
            id: id
        }
    }).then(data =>{
        res.send({data})
    })
        .catch(err => {
            return next(err)
        })
}

function update(req, res, next) {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    let payload = jwt.decode(token)
    User.update(req.body, {
        where: { id: payload.id }
    })
        // return number of rows that affected
        .then(num => {
            if (num == 0) {
                return next({
                    statusCode: 404,
                    message: "Profile is not updated yet"
                })
            }
            return res.status(200).send({
                status:"Success",
                message:"Pembaruan Berhasil",
                data:{}
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Delete self Account
function destroy(req, res, next) {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    let payload = jwt.decode(token)
    User.destroy({
        where: {
            id: payload.id
        }
    })
        // return the number of affected rows
        .then(num => {
            if (num == 0) {
                return next({
                    statusCode: 404,
                    message: "akun gagal terhapus"
                })
            }
            res.status(200).send({
                status:"Success",
                message:"Penghapusan akun Berhasil",
                data:{}
            })
        })
        .catch(err => {
            return next(err)
        })
}

module.exports = {
    create,
    login,
    findAll,
    update,
    destroy,
    findOne,
}
