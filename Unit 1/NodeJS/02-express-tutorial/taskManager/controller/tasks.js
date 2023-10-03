let { tasks } = require('../data');

//get tasks and returns them
const readTasks = (req, res) => {
  // res.send(tasks)
  res.json({ success: true, data: tasks });
};

//post function for creating tasks
let length = tasks.length + 1;
const createTasks = (req, res) => {
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
};

//post function for updating tasks
const updateTasks = (req, res) => {
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
};

//post function for deleting tasks
const deleteTasks = (req, res) => {
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
