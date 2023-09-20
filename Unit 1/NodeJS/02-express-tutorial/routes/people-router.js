const express = require('express');
const router = express.Router();

//Below Here's the work with the router app

let {people} = require('../data');

router.get('/', (req, res) =>{
    res.json({success: true, data:people})//gets people
})

router.post('/', (req, res) =>{
    console.log(req.body)
    const {name} = req.body;
    if(name){
        return res.status(201).json({success: true, person:name})//adds people 
    }
    res.status(404).json({success:false, msg: "Please Provide a Name"})
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router