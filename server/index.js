require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./db/conn')
const users = require('./modals/userSchema')
const router = require('./routes/router')
const { urlencoded } = require('express')

const app = express()

app.use(express.json()) //parsing json data into row data
app.use(cors()) // For connecting file to frontend
const port = 8090;
app.use(express.urlencoded({extended:false}))
app.use(router) //For API calling

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})