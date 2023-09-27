//this will excute on the client side not the browser
const taskForm = document.querySelector('form');
const taskInput = document.getElementById('name');
const taskList = document.querySelector('.task-items');
const filterDropdown = document.getElementById('filter');

const fetchTasks = async () => {
  try {
    const { data } = await axios.get('/api/tasks');
    console.log(data);

    //tasks is an array of h5 elements filled with their names, jsx
    const tasks = data.data.map((person) => {
      return `
            <div class="person">
                <h5>${person.name}</h5>
                <button class="edit-btn" data-id="${person.id}"> Edit </button>
                <button class="delete-btn" data-id="${person.id}"> Delete </button>
            </div>
            `;
    }); //data the var, data the array, then map it

    taskList.innerHTML = tasks.join(''); //joins together all h5 tag with no spaxes

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

      // //added query selectors for the edit and delete buttons
      // const editButtons = document.querySelectorAll('.edit-btn');
      // const deleteButtons = document.querySelectorAll('.delete-btn');

      //created an edit button for each arrow function
      editButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const personDiv = button.closest('.person');
          const h5Element = personDiv.querySelector('h5');
          const currentName = h5Element.textContent;

          const nameInput = document.createElement('input');
          nameInput.type = 'text';
          nameInput.value = currentName;

          //replaced the <h5> element with the input for editing
          h5Element.replaceWith(nameInput);

          //added query selector for the save button
          const saveButton = document.createElement('button');
          saveButton.textContent = 'Save';
          personDiv.appendChild(saveButton);

          //allows the users to directly change the task intead of doing it in the input box and saving there postions
          saveButton.addEventListener('click', async () => {
            const newName = nameInput.value;
            const id = button.getAttribute('data-id');
            await editName(id, newName);

            //restored the edited name to the <h5> element
            nameInput.replaceWith(h5Element);
            h5Element.textContent = newName;

            //and removed the "Save" button so it doesn't appear in the normal task modifier only when you want to edit things
            saveButton.remove();
          });
        });
      });

      //created an delete button for each arrow function that will delete the tasks
      // deleteButtons.forEach((button) => {
      //   button.addEventListener('click', () => {
      //     const id = button.getAttribute('data-id');
      //     if (confirm('Are you sure you want to delete this name?')) {
      //       deleteName(id);
      //     }
      //   });
      // });
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        // Handle delete button click
        deleteTask(task.id);
      });
      
      //append elements to task item
      taskItem.appendChild(taskCheckbox);
      taskItem.appendChild(taskName);
      taskItem.appendChild(taskDescription);
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
    });
  }catch (error) {
  //used a try/catch the catch will get any errors
  console.log(error);
  // formAlert.textContent = error.response.data.msg;
  }
}

//function to edit the name
const addTask = async (name) => {
    try {
      const { data } = await axios.post('/api/tasks', { name });
      tasks.push({ name, completed: false }); // Example: Push a new task object
      taskInput.value = '';
      formAlert.textContent = 'Task added successfully!';
      fetchTasks(); // Fetch and update the task list
    } catch (error) {
        console.error(error);
        formAlert.textContent = 'Error adding task';
    }
};

//function to update task completion status
const updateTask = async (id, taskName, completed) => {
    try {
        const { data } = await axios.put((`/api/tasks/${id}`))
        // { check: completed });
        tasks[index].completed = completed; // Example: Update the task object in 'tasks'
        taskName.style.textDecoration = completed ? 'line-through' : 'none';
        fetchTasks();
    } catch (error) {
        console.error(error);
    }
};

//function to edit the name
const editName = async (id, newTasks) => {
  try {
    const { data } = await axios.put(`/api/tasks/${id}`, { name: newTasks });
    fetchTasks();
    // Notify the user of the change
    formAlert.textContent = `Task updated to: ${newTasks}, you can now added a new task`;
  } catch (error) {
    formAlert.textContent = error.response.data.msg;
  }
};

// //function to delete the name
// const deleteName = async (id) => {
//   try {
//     const { data } = await axios.delete(`/api/tasks/${id}`);
//     fetchTasks();
//   } catch (error) {
//     formAlert.textContent = error.response.data.msg;
//   }
// };

//function to delete a task
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

//event listener for task form submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        addTask(taskName);
    }
});

//populate the filter dropdown with options
const populateFilterDropdown = () => {
    const filterOptions = ['All Tasks', 'Completed Tasks', 'Incomplete Tasks'];
    filterOptions.forEach((option) => {
        const dropdownOption = document.createElement('option');
        dropdownOption.value = option.toLowerCase().replace(' ', '-');
        dropdownOption.textContent = option;
        filterDropdown.appendChild(dropdownOption);
    });
};


//an event listener for filter dropdown change
filterDropdown.addEventListener('change', () => {
    const selectedFilter = filterDropdown.value;
    //implemented filtering logic here based on the selected filter
});

// //html submit form
// const btn = document.querySelector('.submit-btn');
// const input = document.querySelector('.form-input');
// const formAlert = document.querySelector('.form-alert');

// btn.addEventListener('click', async (e) => {
//   //if this wasn't here then when you hit submit it would load a blank page
//   e.preventDefault();
//   const nameValue = input.value;

//   try {
//     const { data } = await axios.post('/api/tasks', { name: nameValue });
//     const h5 = document.createElement('h5');
//     h5.textContent = data.person;
//     taskList.appendChild(h5);
//     fetchTasks();
//   } catch (error) {
//     //console.log(error.response)
//     formAlert.textContent = error.response.data.msg;
//   }
//   input.value = '';
// }); //prevents default action of submitting and reloading form, we will handle the methods of submit and where it goes
fetchTasks()//gets the tasks before it startes creating HTML elememts to fill with those tasks
populateFilterDropdown();