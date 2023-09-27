const result = document.querySelector('.result'); //this will excute on the client side not the browser
//function to edit a name
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

//function to delete a name
const deleteName = async (id) => {
  try {
    const { data } = await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  } catch (error) {
    formAlert.textContent = error.response.data.msg;
  }
};

//updated my fetchTasks function to include edit and delete buttons
const fetchTasks = async () => {
  try {
    const { data } = await axios.get('/api/tasks');
    console.log(data);

    const tasks = data.data.map((person) => {
      return `
                <div class="person">
                    <h5>${person.name}</h5>
                    <button class="edit-btn" data-id="${person.id}"> Edit </button>
                    <button class="delete-btn" data-id="${person.id}"> Delete </button>
                </div>
            `;
    });

    result.innerHTML = tasks.join('');

    // Add event listeners for edit and delete buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
  
    editButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const personDiv = button.closest('.person');
        const h5Element = personDiv.querySelector('h5');
        const currentName = h5Element.textContent;

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = currentName;

        // Replace the <h5> element with the input for editing
        h5Element.replaceWith(nameInput);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        personDiv.appendChild(saveButton);

        saveButton.addEventListener('click', async () => {
          const newName = nameInput.value;
          const id = button.getAttribute('data-id');
          await editName(id, newName);

          // Restore the edited name to the <h5> element
          nameInput.replaceWith(h5Element);
          h5Element.textContent = newName;

          // Remove the "Save" button
          saveButton.remove();
        });
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this name?')) {
          deleteName(id);
        }
      });
    });
  } catch (error) {
    console.log(error);
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
    result.appendChild(h5);
    fetchTasks();
  } catch (error) {
    // console.log(error.response)
    formAlert.textContent = error.response.data.msg;
  }
  input.value = '';
}); //prevents default action of submitting and reloading form, we will handle the methods of submit and where it goes