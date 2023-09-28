// Variables for HTML elements
const taskForm = document.querySelector('form');
const taskInput = document.getElementById('name');
const taskList = document.querySelector('.task-items');
const formAlert = document.querySelector('.form-alert');
const filterDropdown = document.getElementById('filter');

// Function to fetch tasks from the server
const fetchTasks = async () => {
    try {
        const { data } = await axios.get('/api/tasks');
        const tasks = data.data;

        // Clear the task list
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
            taskItem.appendChild(deleteButton);

            taskList.appendChild(taskItem);
        });
    } catch (error) {
        console.error(error);
    }
};

// Function to add a new task
const addTask = async (name) => {
    try {
        const { data } = await axios.post('/api/tasks', { name });
        fetchTasks();
        taskInput.value = '';
        formAlert.textContent = 'Task added successfully!';
    } catch (error) {
        console.error(error);
        formAlert.textContent = 'Error adding task';
    }
};

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

// Function to delete a task
const deleteTask = async (id) => {
    try {
        if (confirm('Are you sure you want to delete this task?')) {
            const { data } = await axios.delete(`/api/tasks/${id}`);
            fetchTasks();
        }
    } catch (error) {
        console.error(error);
    }
};

// Event listener for task form submission
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        addTask(taskName);
    }
});

// Event listener for filter dropdown change
filterDropdown.addEventListener('change', () => {
    const selectedFilter = filterDropdown.value;
    // Implement filtering logic here based on the selected filter
});

// Call the fetchTasks function to load tasks on page load
fetchTasks();