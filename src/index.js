const express = require('express')
require('./db/mongoose')

const User = require("./models/user")
const Task = require("./models/task")
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())


app.post('/users',(req,res)=>{

    const user = new User(req.body)
    
    user.save().then(() =>{
        res.send(user)
    }).catch((error) =>{
        res.status(400).send(error)
    })

    console.log(user)
})

app.post("/task",(req,res)=>{
    const Task = new Task(req.body)

    Task.save().then(()=>{
        res.send(Task)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})


app.listen(port, ( )=>
{
    console.log('Server is up on: ', port)
})


