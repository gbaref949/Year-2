const { User, Task } = require('../models/task'); //import models
const { user, task } = require('../data');
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
    // Create a new user using the User model
    const newUser = new User(req.body);

    // Save the user to the database
    await newUser.save();

    // Respond with the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    // Handle validation errors
    if (error.code === 11000) {
      res.status(400).json({ error: 'User with the same name already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const readTasks = async (req, res) => {
  //   res.send(tasks)
  res.json({ success: true, task: taskSchema });
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTasks = async (req, res) => {
  const { name, details, assignedTo } = req.body; // Added 'assignedTo' field

  if (!name) {
    return res
      .status(400)
      .json({ data: [], success: false, msg: 'Please enter the task name' });
  }

  // Create a new task using the Task model
  const newTask = new Task({ name, details, assignedTo });

  // Save the task to the database
  await newTask.save();

  res.status(201).json(newTask);
};

const updateTasks = async (req, res) => {
  const { id } = req.params;
  const { check, name, details } = req.body;

  try {
    // Find the task by ID
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ success: false, msg: 'Task not found' });
    }

    // Update task properties
    task.check = check;
    task.name = name;
    task.details = details;

    // Save the updated task
    await task.save();

    res.status(202).json({ data: task, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' });
    }

    // Find all tasks assigned to this user
    const tasks = await Task.find({ assignedTo: user._id });

    // Reassign tasks to unassigned
    await Task.updateMany(
      { assignedTo: user._id },
      { $set: { assignedTo: null } }
    );

    // Delete the user
    await user.remove();

    res.status(202).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//route to update task completion status
const filterTasks =
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
  getUsers,
  createUsers,
  readTasks,
  createTasks,
  updateTasks,
  deleteUsers,
  filterTasks,
};
