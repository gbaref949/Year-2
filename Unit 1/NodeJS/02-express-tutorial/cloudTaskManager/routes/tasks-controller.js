const express = require('express');
const router = express.Router();

const {
  createTasks,
  readTasks,
  updateTasks,
  deleteTasks,
  filterTasks,
} = require('../controller/tasks');

router.get('/', readTasks);
router.post('/', createTasks);
router.put('/:id', updateTasks);
router.put('/:id/completion', filterTasks);
router.delete('/:id', deleteTasks);

module.exports = router;