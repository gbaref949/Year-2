const express = require('express');
const app = express();
const logger = require('./middleware/logger')
const authorize = require('./middleware/authorize')

/*
req = middleware => res
order matter if you place the app.use after the home get; it won't run home get since the res will lend before the middlewarehas a chance to run
app.use(logger)//moddifiers for the express router

if you have several middle wate then you can call them in an array where order matters
api/home/products
*/

app.get('/', (req,res)=>{
    res.send('Home');
})

app.get('/about', (req,res)=>{
    res.send('About');
})//will not use the app.use

//API's (https://rapidapi.com/hub)
//https://documenter.getpostman.com/view/9595116/SW7dWSG1