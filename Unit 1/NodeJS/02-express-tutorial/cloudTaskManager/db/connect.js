const mongoose = require('mongoose');
const { User, Task } = require('../models/task.js'); // Import models

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Define a separate function for seeding data
const seedData = async () => {
  // Read your local data (users and tasks) from files or define them in this script
  const usersData = require('../data').user; // An array of user objects
  const tasksData = require('../data').tasks; // An array of task objects

  try {
    // Upload users to MongoDB
    await User.insertMany(usersData);
    console.log('Users uploaded successfully');

    // Upload tasks to MongoDB
    await Task.insertMany(tasksData);
    console.log('Tasks uploaded successfully');
  } catch (error) {
    console.error('Error uploading data:', error);
  } finally {
    mongoose.connection.close();
  }
};

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = { connectDB, seedData};
module.exports = mongoose.connection; 