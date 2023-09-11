//https://www.npmjs.com/package/morgan
//npm i morgan
const express = require('express');
const app = express();
const morgan = require('morgan');

// app.use(express.static('./public'))

app.use(morgan('short'))

app.get('/', (req,res) =>{
    res.send('Welcome home')
})

app.get('/bout', (req,res) =>{
    res.send('About')
})

app.get('/api/products', (req,res) =>{
    res.send('Products')
})

app.get('/api/items', (req,res)=>{
    res.send('Items')
})
app.all('*', (req,res)=>{res.send('Thats not a thing')})

app.listen(5000, () => {
    console.log('listening on port 5000')
})