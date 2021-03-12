const design = require('../controllers/design.controller');
const router = require('express').Router();
const multer = require('multer')
const joiMiddleware = require('../middlewares/joiValidator')
const jwtMiddleware = require('../middlewares/jwtAuth')

//const upload = multer({ storage })

router.get('/upload',(req,res)=>{
    res.json({
        message: "success"
    })
})

router.post('/upload',jwtMiddleware, design.upload)

router.get('/getAll',design.getAll)

router.get('/showAll',design.showAll)

router.put('/:id/setPrice',design.setPrice)


module.exports = router