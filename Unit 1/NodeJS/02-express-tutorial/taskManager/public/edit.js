const form = document.getElementById('edit-form');
const id = new URLSearchParams(window.location.search).get('id');

// Populate form with task data
async function populateForm() {
  const res = await fetch(`/api/tasks/${id}`);
  const task = await res.json();

  // Populate form fields
  document.querySelector('[name="name"]').value = task.name;
  document.querySelector('[name="details"]').value = task.details;
}

populateForm();

// Form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: form.elements.name.value,
    details: form.elements.details.value,
  };

  await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  location.assign('/');
});
