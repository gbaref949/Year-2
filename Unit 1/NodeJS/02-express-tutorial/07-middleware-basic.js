const express = require('express');
const app = express();

//req ==> middleware ==> res

const logger = (req, res, next) =>{
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    //This is an example of terminating your code in the middleware
    //res.send('testing')
    next()// if you don't have next at the bottom of your specific middleware yoru process won't finish 
}

app.get('/',logger, (req, res, next) => {
    res.send("Home")
})


app.listen (5000, () => {
    console.log("listening on port 5000")
})