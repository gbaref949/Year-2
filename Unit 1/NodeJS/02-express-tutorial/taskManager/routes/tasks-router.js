const express = require('express');
const router = express.Router();

//Below Here's the work with the router app

let {tasks} = require('../data');

router.get('/', (req, res) =>{
    res.json({success: true, data:tasks})//gets tasks
})

router.post('/', (req, res) =>{
    console.log(req.body)
    const {name} = req.body;
    if(name){
        return res.status(201).json({success: true, person:name})//adds tasks
    }
    res.status(404).json({success:false, msg: "Please Provide a Name"})
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const {name} = req.body
    const person = tasks.find((person) => person.id === Number(id))

    if(!person){
        return res.json({success:false, data:[]})
    }

    const newTasks = tasks.map((person) =>{
        if(person.id === Number(id)){
            person.name = name
        }
        return person
    })

    res.status(202).json({data:newTasks, success:true})
})

router.delete('/:id', (req, res) => {
    const {id} = req.params
    const person = tasks.find((person) => person.id === Number(id))

    if(!person){
        return res.status(404).json({success:false, msg: 'No matching ID found'})
    }

    tasks = tasks.filter((person) => {
        return person.id !== Number(id)
    })
    res.status(202).json({data:tasks, success:true})
})

module.exports = router