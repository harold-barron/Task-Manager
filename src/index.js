const express = require('express')
require('./db/mongoose')
const userRouter = require('../src/router/userRouter')
const taskRouter = require('../src/router/taskRouter')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ( )=>{
    console.log('Server is up on: ', port)
})
