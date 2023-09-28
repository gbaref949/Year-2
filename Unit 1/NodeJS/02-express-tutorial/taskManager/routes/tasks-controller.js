const express = require('express');
const router = express.Router();

const {
  createTasks,
  readTasks,
  updateTasks,
  deleteTasks,
//   updateTaskCompletion,
} = require('../controller/tasks');

router.get('/', readTasks);
router.post('/', createTasks);
// router.post('/:id', updateTaskCompletion);
router.put('/:id', updateTasks);
router.delete('/:id', deleteTasks);

module.exports = router;