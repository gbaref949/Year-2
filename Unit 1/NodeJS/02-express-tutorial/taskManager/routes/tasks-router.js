const express = require('express');
const router = express.Router();

//Below Here's the work with the router app

let {tasks} = require('../data');

router.get('/', (req, res) => {
  res.json({ success: true, data: tasks }); //gets tasks
});

router.get('/edit', (req, res) => {
  res.render('edit');
});

router.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === id);
  res.json(task);
});

router.get('/api/tasks/:check', (req, res) => {
  const { check } = req.params;
  const task = tasks.find((t) => t.check === check);
  res.json(task);
});

router.post('/', (req, res) =>{
    console.log(req.body)
    const {name} = req.body;
    const {details} = req.body;
    
    if(name){
        return res.status(201).json({success: true, person:name})//adds tasks
    }
    res
      .status(404)
      .json({ success: false, msg: 'Please Provide a Name' });

    if(details) {
      return res.status(201).json({ success: false, person: details }); //adds tasks
    }
    res
      .status(404)
      .json({ success: false, msg: 'Please Provide some details' });
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const { check } = req.params;
    const { name } = req.body;
    const { details } = req.body;
    const person = tasks.find((person) => person.id === Number(id))

    if(!person){
        return res.json({success:false, data:[]})
    }

    const newTasks = tasks.map((person) =>{
        if(person.id === Number(id)){
            person.name = name
            person.details = details
            person.check = check
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