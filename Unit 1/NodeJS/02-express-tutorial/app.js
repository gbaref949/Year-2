const express = require('express');
const path = require('path');
const app = express();

//setup static middleware
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) =>{
    console.log(req.url);
    res.sendFile(path.join(__dirname, '/public'))
})

app.get('*', (req, res) =>{
    res.status(404).send("404 Not Found")
})

app.listen(5000, () =>{
    console.log('Server listening on port 5000')
})