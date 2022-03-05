const asyncHandler = require('express-async-handler');

const getTasks = asyncHandler( async (req, res) => {
    res.json({tasks : {'id': 1, 'name': 'Task 1'}});
});

const setTask =asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Name is required');
    }
        
    res.json({tasks : {'id': 1, 'name': 'Task 1'}});
});

const updateTask = asyncHandler( async(req, res) => {
    res.json(`Task with id ${req.params.id} updated`);
});

const deleteTask =asyncHandler(async (req, res) => {
    res.json(`Task with id ${req.params.id} deleted`);
});

module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask
};