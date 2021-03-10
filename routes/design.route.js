const design = require('../controllers/design.controller');
const router = require('express').Router();
const multer = require('multer')
const uuid = require('uuid').v5





//const upload = multer({ storage })

router.get('/upload',(req,res)=>{
    res.render('uploadImage.ejs')
})

router.post('/upload', design.upload)



module.exports = router