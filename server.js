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
app.set('view-engine','ejs')

const userRoutes = require('./routes/user.routes');
const designRoutes = require('./routes/design.route');
app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.use('/user', userRoutes)
app.use('/design',designRoutes)
db.sequelize.sync({ })


app.listen(3000)