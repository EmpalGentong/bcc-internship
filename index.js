require('dotenv').config()
const express = require('express')
const app = express();
const _ = require('lodash')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors({ origin : "https://localhost:3000"}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/", (_, res) => {
    res.json(
        {
            message: "Hello, your app is running smoothly."
        }
    )
})


const PORT = process.env.APP_PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`, ``)
})