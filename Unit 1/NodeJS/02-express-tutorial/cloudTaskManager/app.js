const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/connect');
const app = express();
//ur app.js should look small and clean
const tasks = require('./routes/tasks-controller');
const auth = require('./routes/auth');
const connectDB = require('./db/connect');

app.use(bodyParser.json());
//Static assets
app.use(express.static('./public'));
//parse form data
app.use(express.urlencoded({ extended: false }));
//parse json data
app.use(express.json());
//routes/router
app.use('/api/tasks', tasks); //creating seperate routers for seperate purposes
app.use('/login', auth);

const initServer = async () => {
  //first thing we want it to do is connect to the server
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, () => {
      //server listen
      console.log('Server is listening on Port 5000');
    });
  } catch (error) {
    console.log(error);
  }
};

initServer();
