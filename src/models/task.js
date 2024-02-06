const mongoose = require('mongoose')
const { Schema, model } = mongoose

// import mongoose from 'mongoose'
// const { Schema, model } = mongoose

const task = model("Task",{
    description: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = task

// const task = model("task", taskSchema)

// const add = new task({
//     description: "My New Task",
//     completed: true
// })

// task.save().then(()=>{
//     console.log(task);
// }).catch(()=>{
//     console.log(error)
// })