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

//declared the variables needed
const express = require('express');
const app = express();
const { menu } = require('./menu');
const port = 5000;
const http = require('http');

// middleware needed  to parse JSON req
app.use(express.json());

//used app.get to display every item by title and each unique category
app.get('/', (req, res) => {
  const menuTitles = menu.map((item) => ({ id: item.id, title: item.title }));
  const uniqueCategories = [...new Set(menu.map((item) => item.category))];
  res.json({ menuTitles, categories: uniqueCategories });
});

//then used .find to look through each menu item by id using params
app.get('/api/menu/:id', (req, res) => {
  const { id } = req.params;
  const item = menu.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

//finally I queried the menu based on category
app.get('/api/menu', (req, res) => {
  const { category, sort } = req.query;

  let filteredMenu = [...menu];

  if (category) {
    filteredMenu = filteredMenu.filter((item) => item.category === category);
  }

  if (sort === 'asc') {
    filteredMenu.sort((a, b) => a.price - b.price);
  } else if (sort === 'desc') {
    filteredMenu.sort((a, b) => b.price - a.price);
  }

  res.json(filteredMenu);
});

//created a sever port for the api to listen on
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
