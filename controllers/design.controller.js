const _ = require('lodash')
const db = require('../models')
const design = db.design;
const multer = require('multer')
const helpers = require('../utils/helper-img')
const uuid = require('uuid').v4
const path = require('path')


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'yourDesign');
    },
    filename: (req,file,cb)=>{
        const ext = path.extname(file.originalname);
        const id = uuid();
        const filepath = `yourDesign/${id}${ext}`
        design.create({
            filepath : filepath ,
            filename : `${id}${ext}`,
            userId : req.body.name
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

        res.json( {status:'OK' , uploaded: req.files.length});
    });
}
module.exports={
    upload,
}