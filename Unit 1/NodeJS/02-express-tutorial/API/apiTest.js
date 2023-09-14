/*
Objective:

You will create a Menu API from an object posted on Google chat using Express methods. 
Deliverables:

All of the responses should be in JSON form

The home page should display every item by title and each unique category dynamically
A way to look up each menu item by id using params
A way to query the menu based on category
A way to sort the menu based on price, asc, and dec
*/

//Lets go nodemon and postman
const express = require('express');  //declared a express.js framework for serving web pages
const app = express();
const { menu } = require('./menu');
const port = 5000;


app.use(express.static(path.join(__dirname, '/api')));
app.get('/', (req, res) =>{
    console.log(req.url);
    res.sendFile(path.join(__dirname, '/api'))
    //res.send('<h1> Home Page </h1> <a href="/api/menu">Menu</a>');
})

//Return all menu items
app.get('/api/menu', (req, res) => {
    const newMenu = menu.map((menu) => {
        const { id, name, age } = menu
        return { id, name, age }
    })
    res.json(newMenu);
})

//This is how you set up params for the data query 

app.get('/api/menu/:menuID', (req, res) => {
    console.log(req.params)
    const { menuID } = req.params
    const singleMenu = menu.find(
        //You will always get back a number
        (menu) => menu.id === Number(menuID)
    )
    if (!singleMenu) {
        return res.status(404).send('Menu not found')
    }
    return res.json(singleMenu)
})

//returns an object that holds all of the params from the url as propertoes
app.get('/api/menu/:menuID/category/:categoryID', (req, res) => {
    console.log(req.params)
    res.send("This menu has been reviewed by a person: It's the best there is 10/10 would buy again!")
})

//Sets up a query that you can grab
app.get('/api/v1/query', (req, res) => {
    console.log(req.query)
    const {search, limit} = req.query
    let sortedMenu = [... menu]
    if(search){
        sortedMenu = sortedMenu.filter((menu) => {
            return menu.name.startsWith(search)
        })
    }
    if(limit){
        sortedMenu = sortedMenu.slice(0,Number(limit))
    }
    if(sortedMenu.length < 1){
        return res.status(200).json({sucess:true, data:[]})
    }
    res.status(200).json(sortedMenu)
})

app.get('*', (req, res) =>{
    res.status(404).send("404 Not Found")
})

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});