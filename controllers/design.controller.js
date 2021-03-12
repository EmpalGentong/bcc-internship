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
            res.status(200).send({ design })
        })
        .catch(err => {
            next(err)
            return;
        })
}

module.exports={
    upload,
    getAll,
}