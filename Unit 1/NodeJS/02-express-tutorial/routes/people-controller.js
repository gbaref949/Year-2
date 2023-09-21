const express = require('express');
const router = express.Router();

const {createPeople: createPeople, readPeople, updatePeople, deletePeople} = require('../controller/people');

router.get('/', readPeople);
router.post('/', createPeople);
router.put('/:id', updatePeople);
router.delete('/:id', deletePeople);

module.exports = router;