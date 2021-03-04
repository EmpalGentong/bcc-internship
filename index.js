require('dotenv').config()
const express = require('express')
const app = express();
const _ = require('lodash')
const db = require('./models')
const bodyParser = require('body-parser')


//routes
const userRoutes = require('./routes/user.route');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/user', userRoutes)

 
app.get("/", (_, res) => {
    res.json(
        {
            message: "Hello, your app is running smoothly."
        }
    )
})

db.sequelize.sync({ })



const PORT = process.env.Port_aplikasi || 8080;

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`, ``)
})