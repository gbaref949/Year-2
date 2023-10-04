const express = require('express');
const router = express.Router();

const {
  getUsers,
  createUsers,
  readTasks,
  createTasks,
  updateTasks,
  deleteUsers,
  filterTasks,
} = require('../controller/tasks');

router.get('/users', getUsers);
router.post('/users', createUsers);
router.get('/tasks', readTasks);
router.post('/tasks', createTasks);
router.put('/tasks/:id', updateTasks);
router.put('/tasks/:id/completion', filterTasks);
router.delete('/users/:id', deleteUsers);

module.exports = router;
