const express = require('express')
require('./db/mongoose')
const userRouter = require('../src/router/userRouter')
const taskRouter = require('../src/router/taskRouter')
const app = express()

const cors = require('cors')
const corOptions = {
    origin: "http://localhost:8081"
}
app.use(cors(corOptions))
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app