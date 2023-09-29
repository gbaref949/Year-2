// let { tasks } = require('../data');
const tasks = require('../models/task');
const asyncWrapper = require('../middleware/asyncWrapper');
const {createCustomError} = require('../errors/custom-error');

//get tasks and returns them
const readTasks = async (req, res) => {
  //res.send(tasks)
  // res.json({ success: true, data: tasks });
  try{
    let answer = await tasks.find({})
    console.log(answer)
    res.json(answer)
   }catch(err){
    console.log(err)
  }
};

//post function for creating tasks
let length = tasks.length + 1;
const createTasks = async (req, res) => {
  const { name, details } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ data: [], success: false, msg: 'Please enter your name' });
  }
  if (!details) {
    return res.status(400).json({ data: [], success: false });
  }

  let person = { id: length++, name: name, details: details };
  tasks.push(person);
  res.status(201).json({ success: true, data: [tasks] });

  try{
    let answer = await tasks.create(req.body)
    console.log(answer)
    res.json(answer)
   }catch(err){
    console.log(err)
  }
};

//post function for updating tasks
const updateTasks = async (req, res) => {
  const { id } = req.params;
  const { check } = req.params;
  const { name } = req.body;
  const { details } = req.body;
  const person = tasks.find((person) => person.id === Number(id));

  if (!person) {
    return res.json({ success: false, data: [] });
  }

  const newTasks = tasks.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
      person.details = details;
      person.check = check;
    }
    return person;
  });

  res.status(202).json({ data: newTasks, success: true });

  try{
    let answer = await tasks.updateOne(req.body)
    console.log(answer)
    res.json(answer)
   }catch(err){
    console.log(err)
  }
};

//post function for deleting tasks
const deleteTasks = async (req, res) => {
  const { id } = req.params;
  const person = tasks.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: 'No matching tasks found' });
  }

  tasks = tasks.filter((person) => {
    return person.id !== Number(id);
  });

  res.status(202).json({ data: tasks, success: true });

  try{
    let answer = await tasks.deleteOne({__v:0})
    console.log(answer)
    res.json(answer)
   }catch(err){
    console.log(err)
  }
};

//route to update task completion status
filterTasks =
  ('/api/tasks/:id/completion',
  (req, res) => {
    const taskId = parseInt(req.params.id);
    const completed = req.body.completed;

    //find the task in your database (replace this with your database query)
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    //update the task's completion status
    taskToUpdate.check = completed;

    //respond with the updated task
    res.json({
      msg: 'Task completion status updated successfully',
      task: taskToUpdate,
    });
  });

module.exports = {
  readTasks,
  createTasks,
  updateTasks,
  deleteTasks,
  filterTasks,
};
