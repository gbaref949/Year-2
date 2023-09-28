// Define an empty array to store tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
  const tasksContainer = document.getElementById('tasks');
  tasksContainer.innerHTML = '';

  tasks.forEach((task) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    if (task.completed) {
      taskItem.classList.add('completed');
    }

    taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${
      task.completed ? 'checked' : ''
    }>
            <span class="task-name">${task.name}</span>
            <p class="task-details">${task.details}</p>
            <button class="edit-btn" data-id="${task.id}">Edit</button>
            <button class="delete-btn" data-id="${task.id}">Delete</button>
        `;

    tasksContainer.appendChild(taskItem);
  });
}

// Function to add a new task
function addTask(name, details) {
  const id = tasks.length + 1;
  const task = {
    id,
    name,
    details,
    completed: false,
  };

  tasks.push(task);
  renderTasks();
}

// Function to edit a task
function editTask(id, newName, newDetails) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].name = newName;
    tasks[taskIndex].details = newDetails;
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// Function to toggle task completion
function toggleTaskCompletion(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
  }
}

// Event listener for form submission
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskNameInput = document.getElementById('task-name');
  const taskDetailsInput = document.getElementById('task-details');
  const taskName = taskNameInput.value.trim();
  const taskDetails = taskDetailsInput.value.trim();
  if (taskName !== '') {
    addTask(taskName, taskDetails);
    taskNameInput.value = '';
    taskDetailsInput.value = '';
  }
});

// Event delegation for edit and delete buttons
const tasksContainer = document.getElementById('tasks');
tasksContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const taskId = parseInt(e.target.getAttribute('data-id'));
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const newName = prompt('Edit Task Name:', task.name);
      const newDetails = prompt('Edit Task Details:', task.details);
      if (newName !== null && newDetails !== null) {
        editTask(taskId, newName, newDetails);
      }
    }
  } else if (e.target.classList.contains('delete-btn')) {
    const taskId = parseInt(e.target.getAttribute('data-id'));
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  } else if (e.target.classList.contains('task-checkbox')) {
    const taskId = parseInt(e.target.getAttribute('data-id'));
    toggleTaskCompletion(taskId);
  }
});

// Initial rendering of tasks
renderTasks();


// const taskForm = document.getElementById('task-form');
// const taskNameInput = document.getElementById('task-name');
// const taskList = document.getElementById('task-list');
// const filterDropdown = document.getElementById('filter');

// let tasks = [];

// // Event listener for adding a task
// taskForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const taskName = taskNameInput.value.trim();
//   if (taskName) {
//     const newTask = {
//       id: tasks.length + 1,
//       name: taskName,
//       details: '',
//       check: false,
//     };
//     tasks.push(newTask);
//     displayTasks();
//     taskNameInput.value = '';
//   }
// });

// // Event listener for filtering tasks
// filterDropdown.addEventListener('change', () => {
//   displayTasks();
// });

// // Function to display tasks based on the filter
// function displayTasks() {
//   const selectedOption = filterDropdown.value;
//   taskList.innerHTML = '';
//   tasks.forEach((task) => {
//     if (
//       selectedOption === 'all' ||
//       (selectedOption === 'incomplete' && !task.check)
//     ) {
//       const taskDiv = document.createElement('div');
//       taskDiv.className = 'task';

//       const checkbox = document.createElement('input');
//       checkbox.type = 'checkbox';
//       checkbox.checked = task.check;
//       checkbox.addEventListener('change', () => {
//         task.check = checkbox.checked;
//         displayTasks();
//       });

//       const name = document.createElement('h3');
//       name.textContent = task.name;

//       const details = document.createElement('p');
//       details.textContent = task.details;

//       const editButton = document.createElement('button');
//       editButton.textContent = 'Edit';
//       editButton.addEventListener('click', () => {
//         const updatedName = prompt('Edit Task Name:', task.name);
//         if (updatedName !== null) {
//           task.name = updatedName;
//           displayTasks();
//         }
//       });

//       const deleteButton = document.createElement('button');
//       deleteButton.textContent = 'Delete';
//       deleteButton.addEventListener('click', () => {
//         tasks = tasks.filter((t) => t.id !== task.id);
//         displayTasks();
//       });

//       taskDiv.appendChild(checkbox);
//       taskDiv.appendChild(name);
//       taskDiv.appendChild(details);
//       taskDiv.appendChild(editButton);
//       taskDiv.appendChild(deleteButton);
//       taskList.appendChild(taskDiv);
//     }
//   });
// }

// // Initialize the task list
// displayTasks();