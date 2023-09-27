let {tasks} = require('../data')

//get tasks and returns them
const readTasks = (req,res) => {
    // res.send(tasks)
    res.json({success: true, data:tasks});
}

//post function for creating tasks
let length = tasks.length + 1
const createTasks = (req,res) => {
    const {name,id, details, check} = req.body
    if(!name){
        return res.status(400).json({data:[], success:false, msg:"Please enter your tasks"})
    }

    let person = {id: length++, name:name}
    tasks.push(person)
    res.status(201).json({success:true, data:[tasks]})
}

//post function for updating tasks
const updateTasks = (req,res) => {
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
}

//post function for deleting tasks
const deleteTasks = (req, res) => {
    const {id} = req.params
    const person = tasks.find((person) => person.id === Number(id))

    if(!person){
        return res.status(404).json({success:false, msg: 'No matching tasks found'})
    }

    tasks = tasks.filter((person) => {
        return person.id !== Number(id)
    })

    res.status(202).json({data:tasks, success:true})
}

const taList = (req, res) => {
const taskList = document.querySelector('.task-items');
const filterDropdown = document.getElementById('filter');

const { data } = axios.get('/api/tasks');
const tasks = data.data;

    //Clear the task list
    taskList.innerHTML = '';

    // Populate the task list
    tasks.forEach((task) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        // Create task name element
        const taskName = document.createElement('h5');
        taskName.textContent = task.name;

        // Create task description element (shown on hover)
        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.details;
        taskDescription.classList.add('task-description');

        // Create checkbox for completion
        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = task.check;
        taskCheckbox.addEventListener('change', () => {
            // Handle checkbox change (strikethrough and update task)
            updateTask(task.id, taskName, taskCheckbox.checked);
        });

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            // Handle delete button click
            deleteTask(task.id);
        });

        // Append elements to task item
        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskName);
        taskItem.appendChild(taskDescription);
        taskList.appendChild(taskItem);
    });

// Function to update task completion status
const updateTask = async (id, taskName, completed) => {
    try {
        const { data } = await axios.put(`/api/tasks/${id}`, { check: completed });
        taskName.style.textDecoration = completed ? 'line-through' : 'none';
        fetchTasks();
    } catch (error) {
        console.error(error);
    }
};

// Populate the filter dropdown with options
const populateFilterDropdown = () => {
    const filterOptions = ['All Tasks', 'Completed Tasks', 'Incomplete Tasks'];
    filterOptions.forEach((option) => {
        const dropdownOption = document.createElement('option');
        dropdownOption.value = option.toLowerCase().replace(' ', '-');
        dropdownOption.textContent = option;
        filterDropdown.appendChild(dropdownOption);
    });
};

// Event listener for filter dropdown change
filterDropdown.addEventListener('change', () => {
    const selectedFilter = filterDropdown.value;
    // Implement filtering logic here based on the selected filter
});

populateFilterDropdown();
};

module.exports = {readTasks, createTasks, updateTasks, deleteTasks, taList}