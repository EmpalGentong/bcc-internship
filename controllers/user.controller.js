const _ = require('lodash')
const db = require('../models')
const User = db.users;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

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
        if (err.name == 'SequelizeUniqueConstraintError' || err.phone == 'SequelizeUniqueConstraintError') {
            const failResponse = {
                success: 'false',
                error: {
                    // Fetch
                    details: _.map(err.errors, ({ message, type }) => ({
                        message:"username atau no telepon dipakai telah digunakan",
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
    const id = req.params.id
    console.log(id)
    User.findByPk(id)
        .then(user => {
            if (!user) return next("User with given id is not found.")
            res.status(200).send({ user })
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
            res.status(200).send({
                success: true,
                message: "Profile is updated."
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
                    message: "Account is not deleted yet"
                })
            }
            res.status(200).send({
                success: true,
                message: "Account is deleted."
            })
        })
        .catch(err => {
            return next(err)
        })
}





module.exports ={
    create,
    login,
    findAll,
    findOne,
    update,
    destroy
}