const express = require('express')
require('./db/mongoose')

const User = require("./models/user")
const Task = require("./models/task")
const app = express()

const userRouter = require('../src/router/userRouter')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)


app.post("/task",async (req,res)=>{
    const task = new Task(req.body)


    try{
        await task.save()
        res.send(task)
    } catch(error){
        res.status(400).send(error)
    }
    
})

app.get("/task", async(req,res)=>{

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(error){
        res.status(500).send()
    }
    

})

app.get("/task/:id", async (req,res) =>{ 

    const taskId = req.params.id
    
    try{
        const task = await Task.findById(taskId)
        if(!task){
            return res.status(404).send("Task id not found")
        }
        res.send(task)
    } catch(error){
        res.status(500).send(error)
    }

})


app.patch('/task/:id', async(req,res) =>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed_field']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send("Error: Invalid update")
    }

    try{
        const updatedTask = await Task.findByIdAndUpdate(req.params.id,req.body, {new: true, runValidators:true})
        res.send(updatedTask)
    } catch (error){
        res.status(500).send(error)
    }
})


app.delete('/task/:id', async (req,res)=>{
    try{
        const taskId = await Task.findByIdAndDelete(req.params.id)

        if(!taskId){
            return res.status(404).send()
        }

        res.send(taskId)
    }catch(error){
        res.status(500).send()
    }
})

app.listen(port, ( )=>
{
    console.log('Server is up on: ', port)
})


