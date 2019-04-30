const express = require('express')
const router = new express.Router()

const Task = require('../models/task')
require('../db/mongoose')



// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Get a specific task
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Post create task
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Update task
router.patch('/tasks/:id', async (req, res) => {
    // Check if corrects arguments
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (isValid !== true) {
        return res.status(400).send({ message: 'Bad arguments.' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send({ message: 'Task not found.' })
        }

        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send({ message: 'Task not found.' })
        }

        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})



// Export
module.exports = router
