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

router.get('/User', getUsers);
router.post('/User', createUsers);
router.get('/', readTasks);
router.post('/', createTasks);
router.put('/:id', updateTasks);
router.put('/:id/completion', filterTasks);
router.delete('/:id', deleteUsers);

module.exports = router;