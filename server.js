require('dotenv').config()
const express = require('express')
const app = express();
const _ = require('lodash')
const bodyParser = require('body-parser')
const db = require('./models')
const uuid = require('uuid').v5
const cors = require('cors')


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("yourDesign"))
app.use(express.static("views"))
app.set('view-engine','ejs')
app.set('views', './views');

const userRoutes = require('./routes/user.routes');
const designRoutes = require('./routes/design.route');

app.get('/',(req,res)=>{
    res.json({
        message:"welcome to freelaunch"
    })
})

app.get('/bendera',(req,res,next)=>{
    res.send('MZWGCZ33ONSWYNDNMF2F6ZDBORQU4Z27MRUV64DPOJXXG7I=')
})

app.use('/user', userRoutes)
app.use('/design',designRoutes)


db.sequelize.sync({ })


app.listen(3000)