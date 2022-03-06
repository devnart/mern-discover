const express = require('express');
const router = express.Router();
const { getTasks, setTask, updateTask, deleteTask } = require('./Controllers/TaskController');
const { getUsers, login, register, currentUser } = require('./Controllers/UserController');
// Tasks routes
router.get('/tasks', getTasks);
router.post('/tasks', setTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

// User routes
router.get('/users', getUsers);
router.post('/users/login', login);
router.post('/users/register', register);
router.get('/users/me', currentUser)

module.exports = router;