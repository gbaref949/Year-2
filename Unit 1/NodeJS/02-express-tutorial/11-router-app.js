const express = require('express');
const app = express();
//ur app.js should look small and clean
const people = require('./routes/people-router');
const auth = require('./routes/auth');

//Static assets
app.use(express.static('./public'))
//parse form data
app.use(express.urlencoded({extended: true}))
//parse json data
app.use(express.json())
//routes/router
app.use('/api/people', people)//creating seperate routers for seperate purposes
app.use('/login', auth)
//server listen
app.listen(5000, ()=>{
    console.log('Server is listening on Port 5000')
})