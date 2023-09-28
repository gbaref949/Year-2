// Variables for HTML elements
const taskForm = document.querySelector('form');
const taskInput = document.getElementById('name');
const taskList = document.querySelector('.task-items');
const filterDropdown = document.getElementById('filter');

// Function to fetch tasks from the server
const fetchTasks = async () => {
  try {
    const { data } = await axios.get('/api/tasks');
    console.log(data);

    const tasks = data.data.map((task) => {
      return `
                <div class="person">
                <br>
                    <h5 class="person">
                        ${task.name}
                    </h5>
                    <p class="details">${task.details}</p>
                    <button class="edit-btn" data-id="${task.id}">Edit</button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                </div>
            `;
    });

    taskList.innerHTML = tasks.join('');

    //added query selectors for the edit and delete buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

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

//function to edit the name
const editName = async (id, newTasks) => {
  try {
    const { data } = await axios.put(`/api/tasks/${id}`, { name: newTasks });
    fetchTasks();
    //notify the user of the change
    formAlert.textContent = `Task updated to: ${newTasks}, you can now added a new task`;
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

  try {
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
