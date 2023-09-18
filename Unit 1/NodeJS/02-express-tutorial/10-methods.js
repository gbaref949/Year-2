const express = require('express')
const app = express()
let {people} = require('./data')

//static assets
app.use(express.static('./public'))

/*Parse form data built-in middleware function in express that parses
incoming request. If you check req.boody w/o then you will see the value as undefined*/

app.use(express.urlencoded({ extended:false}))//no objs just arrays and strings, anything not a json

//Pasre form data this works similary to the urlencoded but handles json
app.use(express.json())//anything a json

app.get('/api/people', (req, res) => {
    req.json({success: true, data:people});
})//outputs a json full of people

app.post('/api/people', (req, res) => {
    console.log(req.body)
    const {name} = req.body
    //If the new person has a name
    if(name){
        return res.status(201).json({success: true, person:name})
    }//because your returning it so it won't get to the else if it's true
    //If the new person doesn't have a name
    return res.status(404).json({success: false, msg: "Please provide a name"})//once it hit res.json then that's the end of it
})

//above is form js.html
//below is for index.html

app.post('/login', (req, res) => {
    console.log(req.body)
    const {name} = req.body
    if(name){
        return res.status(200).json({status:200, data:name})
    }
    res.status("please Provide Credentials")
})

