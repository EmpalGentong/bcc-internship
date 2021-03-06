const user = require('../controllers/user.controller')
const router = require('express').Router();

router.get('/login',(req,res)=>{
    res.render('login.ejs')
})

router.get('/register',(req,res)=>{
    res.render('register.ejs')
})

router.post('/register',user.create)


module.exports = router