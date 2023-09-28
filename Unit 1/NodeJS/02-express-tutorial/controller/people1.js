const people = require('../models/person');
const asyncWrapper = require('../middleware/asyncWrapper');
const {createCustomError} = require('../errors/custom-error');

const getAllPeople = asyncWrapper(async (req, res) =>{
    const People = await people.find({});
    res.status(201).json({People});
});

// const createTask = asyncWrapper(async (req, res) =>{

// })