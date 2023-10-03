const { User, Task } = require('./models/task.js'); //import models

//get tasks and returns them
const getUsers = async (req, res) => {
try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createUsers = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const readTasks = async (req, res) => {
  //   res.send(tasks)
  res.json({ success: true, Task: taskSchema });
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//post function for creating tasks
let length = Task.length + 1;
const createTasks = async (req, res) => {
  const { name, details } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ Task: [], success: false, msg: 'Please enter your name' });
  }
  if (!details) {
    return res.status(400).json({ Task: [], success: false });
  }

  let person = { id: length++, name: name, details: details };
  Task.push(person);
  res.status(201).json({ success: true, Task: [taskSchema] });

  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTasks = async (req, res) => {
  const { id } = req.params;
  const { check } = req.params;
  const { name } = req.body;
  const { details } = req.body;
  const person = Task.find((person) => person.id === Number(id));

  if (!person) {
    return res.json({ success: false, Task: [] });
  }

  const newTasks = Task.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
      person.details = details;
      person.check = check;
    }
    return person;
  });

  res.status(202).json({ Task: newTasks, success: true });

  try {
    let answer = await Task.updateOne(req.body);
    console.log(answer);
    res.json(answer);
  } catch (err) {
    console.log(err);
  }
};

//post function for deleting tasks
const deleteTasks = async (req, res) => {
  const { id } = req.params;
  const person = Task.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: 'No matching tasks found' });
  }

  Task = Task.filter((person) => {
    return person.id !== Number(id);
  });

  res.status(202).json({ Task: taskSchema, success: true });

  try {
    let answer = await Task.deleteOne({ __v: 0 });
    console.log(answer);
    res.json(answer);
  } catch (err) {
    console.log(err);
  }
};

//route to update task completion status
filterTasks =
  ('/api/Task/:id/completion',
  (req, res) => {
    const TaskId = parseInt(req.params.id);
    const completed = req.body.completed;

    //find the task in your database (replace this with your database query)
    const TaskToUpdate = Tasks.find((Task) => Task.id === TaskId);

    if (!TaskToUpdate) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    //update the task's completion status
    TaskToUpdate.check = completed;

    //respond with the updated task
    res.json({
      msg: 'Task completion status updated successfully',
      Task: TaskToUpdate,
    });
  });

module.exports = {
  getUsers,
  createUsers,
  readTasks,
  createTasks,
  updateTasks,
  deleteTasks,
  filterTasks,
};