const design = require('../controllers/design.controller');
const router = require('express').Router();
const multer = require('multer')
const uuid = require('uuid').v5



/*const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(file, '../yourDesign/')
    },
    filename: (req,file,cb)=>{
        const { originalName }= file; 
        cb(null,originalName)
    } 
})*/

const upload = multer({ dest:'uploads/'})

router.get('/upload',(req,res)=>{
    res.render('uploadImage.ejs')
})

router.post('/upload',upload.single('design'),(req,res)=>{
     res.json({ status : 'ok'})
})



module.exports = router