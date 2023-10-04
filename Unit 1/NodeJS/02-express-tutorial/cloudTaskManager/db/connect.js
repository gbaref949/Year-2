const mongoose = require('mongoose');
const { User, Task } = require('../models/task.js'); // Import models

const connectDB = (url) => {
  //Rember this is temp and needs to be replaced
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// // Read your local data (users and tasks) from files or define them in this script
// const usersData = ({ user } = require('../data')); // An array of user objects
// const tasksData = ({ tasks } = require('../data')); // An array of task objects

// // Upload users to MongoDB
// User.insertMany(usersData, (err) => {
//   if (err) {
//     console.error('Error uploading users:', err);
//   } else {
//     console.log('Users uploaded successfully');
//   }
//   mongoose.connection.close();
// });

// // Upload tasks to MongoDB
// Task.insertMany(tasksData, (err) => {
//   if (err) {
//     console.error('Error uploading tasks:', err);
//   } else {
//     console.log('Tasks uploaded successfully');
//   }
//   mongoose.connection.close();
// });

module.exports = connectDB;
