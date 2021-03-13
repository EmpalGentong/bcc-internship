const user = require('../controllers/user.controller');
const bio = require('../controllers/bio.controller');
const router = require('express').Router();
const joiMiddleware = require('../middlewares/joiValidator')
const jwtMiddleware = require('../middlewares/jwtAuth')


router.get('/login',(req,res)=>{
    res.json({
        message: "success"
    })
})

router.get('/register',(req,res)=>{
    res.json({
        message: "success"
    })
})

router.post('/register',joiMiddleware,user.create)

router.post('/login',joiMiddleware,user.login)

router.get('/users',user.findAll)

router.get('/profile',jwtMiddleware, user.findOne)

router.put('/update', jwtMiddleware, joiMiddleware, user.update)

router.get('/dashboard', (req,res) =>{
    res.json({
        message: "success di dashboard"
    })
})

router.delete('/destroy', jwtMiddleware, user.destroy)



//bio

router.post('/bio/create',jwtMiddleware,bio.create)

router.put('/bio/update',jwtMiddleware,bio.updates)

router.get('/bio',jwtMiddleware,bio.showBio)

module.exports = router