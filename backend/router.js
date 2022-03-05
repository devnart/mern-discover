const express = require('express');
const router = express.Router();
const { getTasks, setTask, updateTask, deleteTask } = require('./Controllers/TaskController');

router.get('/tasks', getTasks);
router.post('/tasks', setTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

module.exports = router;