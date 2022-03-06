const asyncHandler = require('express-async-handler');

const Task = require('../models/Task');

const getTasks = asyncHandler( async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

const setTask =asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Name is required');
    }

    const task = await Task.create(req.body); 
        
    res.json(task);
});

const updateTask = asyncHandler( async(req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404)
        throw new Error('Task not found');
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.json(updatedTask);
});

const deleteTask =asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404)
        throw new Error('Task not found');
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json(`Task with id ${req.params.id} deleted`);
});

module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask
};