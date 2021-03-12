const _ = require('lodash')
const db = require('../models')
const design = db.design;
const multer = require('multer')
const helpers = require('../utils/helper-img')
const uuid = require('uuid').v4
const path = require('path')
const jwt = require('jsonwebtoken')

const storage = multer.diskStorage({
    
    destination: (req,file,cb)=>{
        cb(null, 'yourDesign');
    },
    filename: (req,file,cb)=>{
        let token = req.headers.authorization
        token = token.split(' ')[1]
        let payload = jwt.decode(token)
        console.log(token)
        const ext = path.extname(file.originalname);
        const id = uuid();
        const filepath = `${id}${ext}`
        design.create({
            filepath : `yourDesign/${filepath}` ,
            filename : file.originalname,
            userId : payload.id
        }).then(
            cb(null, filepath)
        )
    }, 
})

//function

function upload(req,res,next){
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('design');

    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        res.status(201).send({
            status:"Success",
            message:"Desain berhasil di upload",
            data:{
                uploaded : req.files.length
            }
        })
       
    });
}

function getAll(req, res, next) {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    let payload = jwt.decode(token)
    const id = payload.id
    design.findAll({ 
        where: id === design.id
     })
        .then(design => {
            if (design.length == 0) {
                res.send({
                    status: "Failure",
                    message: "No data is existed",
                    data:{}

                })
            }
            res.status(200).send({ design })
        })
        .catch(err => {
            next(err)
            return;
        })
}

function showAll(req, res, next) {
    var condition = true
    design.findAll({ where: condition })
        .then(data => {
            if (data.length == 0) {
                res.send({
                    status: "Failure",
                    message: "No data is existed",
                    data:{}

                })
            }
            res.send(data)
        })
        .catch(err => {
            next(err)
            return;
        })
}

function findOne(req,res,next){
    const id = req.params.id
    Tweet.findByPk(id)
        .then(data => {
            if (data == null) {
                next("The tweet is not found")
                return;
            }
            res.send(data)
        })
        .catch(err => {
            next(err)
            return
        })
}
function showDesign(req,res,next){
    const id = req.params.id
}

function setPrice(req,res,next){
    let id = req.params.id
    let price = req.body.price
    design.update({ price: price }, {
        where: {
          id: id
        }
      }).then(data => {
        if (data == null) {
            next("The Design is not found")
            return;
        }
      }).catch(err=>{
          next(err)
          return;
      });

}


module.exports={
    upload,
    getAll,
    showAll,
    setPrice
}