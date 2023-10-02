//variables for HTML elements
const taskForm = document.querySelector('form');
const taskInput = document.getElementById('name');
const taskList = document.querySelector('.task-items');
const filterDropdown = document.getElementById('filter');

//updated fetchTasks function
const fetchTasks = async (filter = 'all') => {
  try {
    const { data } = await axios.get('/api/tasks');
    console.log(data);

    //filter tasks based on the selected option
    const filteredTasks = data.data.filter((task) => {
      if (filter === 'all') {
        return true; //show all tasks
      } else if (filter === 'incomplete') {
        return !task.check; //show only incomplete tasks
      }
    });

    const tasks = filteredTasks.map((task) => {
      return `
        <div class="task">
          <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${
        task.check ? 'checked' : ''
      }>
          <h5 class="person${task.check ? ' completed' : ''}">${task.name}</h5>
          <p class="details">${task.details}</p>
          <button class="edit-btn" data-id="${task.id}">Edit</button>
          <button class="delete-btn" data-id="${task.id}">Delete</button>
        </div>
        <br>
      `;
    });

    taskList.innerHTML = tasks.join('');

    const taskCheckboxes = document.querySelectorAll('.task-checkbox');

    taskCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', async () => {
        const id = checkbox.getAttribute('data-id');
        const isChecked = checkbox.checked;

        //get the corresponding <h5> element for the task
        const h5Element = checkbox.nextElementSibling;

        //update the server to mark the task as completed or undone
        await updateTaskCompletion(id, isChecked);

        //apply styles based on the checkbox state
        if (isChecked) {
          h5Element.classList.add('completed');
        } else {
          h5Element.classList.remove('completed');
        }
      });
    });

    //added query selectors for the edit and delete buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    let personDiv;

    //created an edit button for each arrow function
    editButtons.forEach((button) => {
      button.addEventListener('click', () => {
        //update personDiv here
        personDiv = button.closest('.task');

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
          const detailsElement = personDiv.querySelector('.details');
          //get existing details
          const newDetails = detailsElement ? detailsElement.textContent : ''; //get existing details or use an empty string if not found
          const id = button.getAttribute('data-id');
          await editName(id, newName, newDetails); //pass 'newDetails' to editName

          //restored the edited name to the <h5> element
          nameInput.replaceWith(h5Element);
          h5Element.textContent = newName;

          //removed the "Save" button so it doesn't appear in the normal task modifier, only when you want to edit things
          saveButton.remove();
        });
      });
    });

    //created an delete button for each arrow function that will delete the tasks
    deleteButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this name?')) {
          deleteTask(id);
        }
      });
    });
  } catch (error) {
    console.error(error);
    formAlert.textContent = error.response.data.msg;
  }
};

//event listener for filtering tasks
filterDropdown.addEventListener('change', () => {
  //get the selected filter option
  const selectedFilter = filterDropdown.value;
  fetchTasks(selectedFilter); //pass the selected filter to fetchTasks
});

//function to add a new task
const addTask = async (name, details) => {
  //accept 'details' as an argument
  try {
    const { data } = await axios.post('/api/tasks', { name, details }); //include 'details' in the POST request
    fetchTasks();
    taskInput.value = '';
    //clear the details input field as well
    document.getElementById('details').value = '';
    formAlert.textContent = 'Task added successfully!';
  } catch (error) {
    console.error(error);
    formAlert.textContent = 'Error adding task';
  }
};

//function to update task completion status
const updateTaskCompletion = async (id, isChecked) => {
  try {
    //send a PUT request to update the task's completion status on the server
    await axios.put(`/api/tasks/${id}/completion`, { completed: isChecked });
  } catch (error) {
    console.error(error);
  }
};

//function to edit the name
const editName = async (id, newName, newDetails) => {
  try {
    const { data } = await axios.put(`/api/tasks/${id}`, {
      name: newName,
      details: newDetails,
    }); //include 'details' in the PUT request
    fetchTasks();
    //notify the user of the change
    formAlert.textContent = `Task updated to: ${newName}, you can now add a new task`;
  } catch (error) {
    formAlert.textContent = error.response.data.msg;
  }
};

//function to delete the name
const deleteTask = async (id) => {
  try {
    const { data } = await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  } catch (error) {
    formAlert.textContent = error.response.data.msg;
  }
};

//html submit form
const btn = document.querySelector('.submit-btn');
const input = document.querySelector('.form-input');
const formAlert = document.querySelector('.form-alert');

btn.addEventListener('click', async (e) => {
  //if this wasn't here then when you hit submit it would load a blank page
  e.preventDefault();
  const nameValue = input.value;
  const detailsValue = document.getElementById('details').value; //get details input value

  try {
    await addTask(nameValue, detailsValue); //pass 'detailsValue' to addTask
    fetchTasks();
  } catch (error) {
    //console.log(error.response)
    formAlert.textContent = error.response.data.msg;
  }
  input.value = '';
}); //prevents default action of submitting and reloading form, we will handle the methods of submit and where it goes

fetchTasks();
