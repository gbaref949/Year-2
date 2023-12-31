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
    res.json({success: true, data:people});
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

/* Part 1: Above 

The abpve bring in the public folder from berfore and then handles the index and javascrip version. The JS file the form in a sperate JS file then the public folder so we can see that load alongside
the html. The /api/people can rtest by going to the URL, but the use in the sciprt.js where we call with an async await

The get for the api/people is for our testing but then the post will be for the req from the script.js
*/

//Testing Postman: 
let length = people.length + 1
app.post('/api/postman/people', (req, res) => {
    const {name,id} = req.body
    let person = {id: length++, name:name}
    if(!name){
        return res.status(400).json({data:[], success:false, msg:"Please enter a name"})
    }
    res.status(201).json({success:true, data:[... people, person]})
})


//Put res
app.put('/api/postman/:id', (req, res) => {
    const {id} = req.params
    const {name} = req.body
    const person = people.find((person) => person.id === Number(id))

    if(!person){
        return res.json({success:false, data:[]})
    }

    const newPeople = people.map((person) =>{
        if(person.id === Number(id)){
            person.name = name
        }
        return person
    })
    res.status(202).json({data:newPeople, success:true})
})

//Delte Request
app.delete('/api/people/:id', (req, res) => {
    const {id} = req.params
    const person = people.find((person) => person.id === Number(id))

    if(!person){
        return res.status(404).json({success:false, msg: 'No matching ID found'})
    }

    people = people.filter((person) => {
        return person.id !== Number(id)
    })
    res.status(202).json({data:people, success:true})
})

//Server Listen 
app.listen(5000, ()=>{
    console.log('Server is listening on Port 5000')
})