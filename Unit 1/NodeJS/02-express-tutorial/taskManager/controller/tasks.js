let { tasks } = require('../data');

//get tasks and returns them
const readTasks = (req, res) => {
  res.send(tasks);
  let { tasks } = require('../data');
  res.json({ success: true, data: tasks });
};

//post function for creating tasks
let length = tasks.length + 1;
const createTasks = (req, res) => {
  const { name, id, details, check } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ data: [], success: false, msg: 'Please enter your tasks' });
  }

  let person = { id: length++, name: name };
  tasks.push(person);
  res.status(201).json({ success: true, data: [tasks] });
};

//post function for updating tasks
const updateTasks = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person = tasks.find((person) => person.id === Number(id));

  if (!person) {
    return res.json({ success: false, data: [] });
  }

  const newTasks = tasks.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
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

// // Post function for updating task completion
// const updateTaskCompletion = (req, res) => {
//     const { id } = req.params;
//     const { check } = req.body;
//     const task = tasks.find((task) => task.id === Number(id));

//     if (!task) {
//         return res.status(404).json({ success: false, msg: 'No matching task found' });
//     }

//     task.check = check;

//     res.status(202).json({ data: task, success: true });
// };

module.exports = {
  readTasks,
  createTasks,
  updateTasks,
  deleteTasks,
  //   updateTaskCompletion,
};
