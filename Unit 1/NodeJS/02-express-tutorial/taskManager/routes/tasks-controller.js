const express = require('express');
const router = express.Router();

const {createTasks, readTasks, updateTasks, deleteTasks, taList} = require('../controller/tasks');

router.get('/', readTasks);
router.post('/', createTasks);
router.post('/', taList);
router.put('/:id', updateTasks);
router.delete('/:id', deleteTasks);

module.exports = router;