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

//API's (https://rapidapi.com/hub)
//https://documenter.getpostman.com/view/9595116/SW7dWSG1
*/

app.get('/', (req,res)=>{
    res.send('Home');
})

app.get('/about', (req,res)=>{
    res.send('About');
})//will not use the app.use

app.use('/api', [logger, authorize]);
/*
This will aply the logger to any push that include /api as the port of it path
This is a nice way for you to run a logger and stop a certain amount of req but still allow them on the hom and document 
Old way of app.use('/api', logger)*/

app.get('/api/products', (req,res)=>{
    res.send('Products')
})
app.get('/api/items', (req,res)=>{
    console.log(res.user)
    res.send('Items')
})
app.listen(5000, () => {console.log('listening on port 5000')})