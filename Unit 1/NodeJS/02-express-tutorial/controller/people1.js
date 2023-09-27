const People = require('../models/person');
const asyncWrapper = require('../middleware/asyncWrapper');
const {createCustomError} = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) =>{
    const people = await People.find({});
    res.status(201).json({people})
})