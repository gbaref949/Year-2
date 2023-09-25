const result = document.querySelector('.result'); //this will excute on the client side not the browser
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

    editButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const newName = prompt('Enter the new name:');
        if (newName !== null) {
          const id = button.getAttribute('data-id');
          editName(id, newName);
        }
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
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById('myDropdown').classList.toggle('show');
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.submit-btn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
