const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const routerTask = express.Router()


routerTask.post("/task",auth,async (req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    
    try{
        await task.save()
        res.send(task)
    } catch(error){
        res.status(400).send(error)
    }
    
})

routerTask.get("/task",auth, async(req,res)=>{

    try {
        const tasks = await Task.find({owner: req.user._id})
        res.send(tasks)
    } catch(error){
        res.status(500).send()
    }
    

})

routerTask.get("/task/:id", auth, async (req,res) =>{ 

    const taskId = req.params.id
    
    try{
        const task = await Task.findOne({taskId,owner:req.user._id})

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(error){
        res.status(500).send(error)
    }

})


routerTask.patch('/task/:id', auth, async(req,res) =>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed_field']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send("Error: Invalid update")
    }

    try{
        
        const taskToUpdate = await Task.findOne({_id: req.params.id, owner:req.user.id})

        if(!taskToUpdate){
            return res.status(404).send()
        }
    
        updates.forEach((update) => taskToUpdate[update] = req.body[update])
        await taskToUpdate.save()

        res.send(taskToUpdate)
    } catch (error){
        res.status(500).send(error)
    }
})


routerTask.delete('/task/:id', auth,async (req,res)=>{
    try{

        const taskId = await Task.findOneAndDelete({_id:req.params.id, owner: req.user.id})

        if(!taskId){
            return res.status(404).send()
        }

        res.send(taskId)
    }catch(error){
        res.status(500).send()
    }
})

module.exports = routerTask