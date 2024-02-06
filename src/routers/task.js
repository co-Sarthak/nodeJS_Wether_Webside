const express = require('express');
const router = new express.Router()

const Task = require('../models/task')

router.post('/task/register',async (req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

router.get('/task/:id',async (req, res)=>{
    const _id=req.params.id

    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

//list all tasks
router.get('/tasks', async (req,res)=>{

    // Anded limit and skip for Pagination
    // This api route req.query requried params for values
    try{
        // default limit set to 2
        const limitValue = req.query.limit || 2; 
        const skipValue = req.query.skip || 0; 
        const tasks = await Task.find({})
            .limit(limitValue).skip(skipValue); 
        res.status(200).send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.send.status(500).send(e)
    // })
})

//task update
router.patch('/task/:id', async (req, res) =>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router;