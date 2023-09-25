const result = document.querySelector('.result'); //this will excute on the client side not the browser
//function to edit a name
const editName = async (id, newTasks) => {
  try {
    const { data } = await axios.put(`/api/tasks/${id}`, { name: newTasks });
    fetchTasks();
    // Put the edited name back into the input box
    input.value = newTasks;
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
    const dropDown = document.querySelector('.dropdown-btn');
    const checkBox = document.querySelector('.checkbox-btn');

    //add a dropdown menu that will let you select which task (id) to view or to view all task
    // dropDown.forEach((button) => {
    //   button.addEventListener('click', () => {
        
    //   });
    // });

    //use this https://www.javascripttutorial.net/javascript-dom/javascript-checkbox/
    
    //for the checkbox
    //If completed, strike through all text on the task and darken the element that is completed
    //If unchecked undo all changes above
    // checkBox.forEach((button) => {
    //   button.addEventListener('click', () => {
    //     if (check === false){
    //     text.style.display = "block";
    //   } else {
    //     text.style.display = "none";
    //   }
    //   });
    // });

    editButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const newTasks = prompt('Enter the new name:');//fix this so it doesn't make an alert prompt
        if (newTasks !== null) {
          const id = button.getAttribute('data-id');
          editName(id, newTasks);
        }
      });
    });

    // editButtons.style.display = "text-decoration: line-through"
    // eleteButtons.style.display = "text-decoration: line-through"

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