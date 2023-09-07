//Lets go nodemon and postman
const express = require('express');
const app = express();
const {products} = require('./data.js');

app.get('/', (req, res) => {
    res.send('<h1> Home Page </h1> <a href="/api/products">Products</a>');
});

//Return all products 
app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const {id, name, age} = product
        return{id, name, age}
    })
    res.json(newProducts);
})
app.listen(5000, () => {
    console.log('listening on port 5000');
  });
