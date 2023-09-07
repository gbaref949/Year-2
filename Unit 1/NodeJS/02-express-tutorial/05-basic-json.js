const express = require('express');
const path = require('path');
const app = express();

const { products } = require(path.join(__dirname, '/data.js'));

app
  .get('/', (req, res) => {
    res.json(products);
  })
  .listen(5000, () => {
    console.log('listening on port 5000');
  });
