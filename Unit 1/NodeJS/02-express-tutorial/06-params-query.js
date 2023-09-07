//Lets go nodemon and postman
const express = require('express');
const app = express();
const { products } = require('./data.js');

app.get('/', (req, res) => {
    res.send('<h1> Home Page </h1> <a href="/api/products">Products</a>');
});

//Return all products 
app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, age } = product
        return { id, name, age }
    })
    res.json(newProducts);
})

//This is how you set up params for the data query 

app.get('/api/products/:productID', (req, res) => {
    console.log(req.params)
    const { productID } = req.params
    const singleProduct = products.find(
        //You will always get back a number
        (product) => product.id === Number(productID)
    )
    if (!singleProduct) {
        return res.status(404).send('Product not found')
    }
    return res.json(singleProduct)
})

//returns an object that holds all of the params from the url as propertoes
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params)
    res.send("This product has been reviewed by a person: It's the best there is 10/10 wou;d buy again!")
})

// //Sets up a query that you can grab
// app.get('api/v1/query', (req, res) => {
//     console.log(req.query)
//     let sortedProducts = [... products]
// })

app.listen(5000, () => {
    console.log('listening on port 5000');
});
