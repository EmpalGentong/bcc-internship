require('dotenv').config()
const express = require('express')
const app = express();
const _ = require('lodash')
const bodyParser = require('body-parser')
const db = require('./models')
const passport = require('passport')
const session    = require('express-session')

//app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
//app.use(passport.initialize()); 
//app.use(passport.session());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view-engine','ejs')

const userRoutes = require('./routes/user.routes');

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.use('/user', userRoutes)

db.sequelize.sync({ })


app.listen(3000)