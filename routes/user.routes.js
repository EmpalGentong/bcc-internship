const passport = require('passport');
const user = require('../controllers/user.controller');
const router = require('express').Router();
const joiMiddleware = require('../middlewares/joiValidator')
const jwtMiddleware = require('../middlewares/jwtAuth')


router.get('/login',(req,res)=>{
    res.render('login.ejs')
})

router.get('/register',(req,res)=>{
    res.render('register.ejs')
})

router.post('/register',joiMiddleware,user.create)

router.post('/login',joiMiddleware,user.login)

router.get('/users',user.findAll)

router.get('/:id',jwtMiddleware, user.findOne)

router.get('/dashboard', (req,res) =>{
    res.render('dashboard.ejs')
})

module.exports = router