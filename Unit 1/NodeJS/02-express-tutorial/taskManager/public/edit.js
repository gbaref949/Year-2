//variables for HTML elements
const taskForm = document.querySelector('form');
const taskInput = document.getElementById('name');
const taskList = document.querySelector('.task-items');
const filterDropdown = document.getElementById('filter');

//function to fetch tasks from the server
const fetchTasks = async () => {
  try {
    const { data } = await axios.get('/api/tasks');
    console.log(data);

    const tasks = data.data.map((task) => {
      return `
        <div class="task">
          <h5 class="person">${task.name}</h5>
          <p class="details">${task.details}</p>
          <button class="edit-btn" data-id="${task.id}">Edit</button>
          <button class="delete-btn" data-id="${task.id}">Delete</button>
        </div>
        <br>
      `;
    });

    taskList.innerHTML = tasks.join('');

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
    const { data } = await axios.post('/api/tasks', { name: nameValue });
    const h5 = document.createElement('h5');
    h5.textContent = data.person;
    taskList.appendChild(h5);
    fetchTasks();
  } catch (error) {
    //console.log(error.response)
    formAlert.textContent = error.response.data.msg;
  }
  input.value = '';
}); //prevents default action of submitting and reloading form, we will handle the methods of submit and where it goes
fetchTasks();
