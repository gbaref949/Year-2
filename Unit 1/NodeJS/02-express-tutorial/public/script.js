const result = document.querySelector('.result'); //this will excute on the client side not the browser

//updated my fetchPeople function to include edit and delete buttons
const fetchPeople = async () => {
  try {
    const { data } = await axios.get('/api/people');
    console.log(data);
    const people = data.data.map((person) => {
      return `
                <div class="person">
                    <h5>${person.name}</h5>
                    <button class="edit-btn" data-id="${person.id}">Edit</button>
                    <button class="delete-btn" data-id="${person.id}">Delete</button>
                </div>
            `;
    });
    result.innerHTML = people.join('');

    // Add event listeners for edit and delete buttons
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
            deleteName(id);
          }
        });
      });
  }catch (error) {
  //used a try/catch the catch will get any errors
  console.log(error);
  formAlert.textContent = error.response.data.msg;
  }
}

//function to edit a name
const editName = async (id, newName) => {
  try {
    const { data } = await axios.put(`/api/people/${id}`, { name: newName });
    fetchPeople();
    // Put the edited name back into the input box
    input.value = newName;
    // Notify the user of the change
    formAlert.textContent = `Name updated to: ${newName}`;
  } catch (error) {
    formAlert.textContent = error.response.data.msg;
  }
};
//function to delete a name
const deleteName = async (id) => {
  try {
    const { data } = await axios.delete(`/api/people/${id}`);
    fetchPeople();
  } catch (error) {
    formAlert.textContent = error.response.data.msg;
  }
};

//hTML Submit Form
const btn = document.querySelector('.submit-btn');
const input = document.querySelector('.form-input');
const formAlert = document.querySelector('.form-alert');

btn.addEventListener('click', async (e) => {
  //if this wasn't here then when you hit submit it would load a blank page
  e.preventDefault();
  const nameValue = input.value;
   try {
    const { data } = await axios.post('/api/people', { name: nameValue });
    const h5 = document.createElement('h5');
    h5.textContent = data.person;
    result.appendChild(h5);
    fetchPeople();
  } catch (error) {
    // console.log(error.response)
    formAlert.textContent = error.response.data.msg;
  }
  input.value = '';
}); //prevents default action of submitting and reloading form, we will handle the methods of submit and where it goes