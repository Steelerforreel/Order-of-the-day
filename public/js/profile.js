const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#task-name').value.trim();
  const description = document.querySelector('#task-desc').value.trim();
  const starting_time = document.querySelector('#starting_time').value.trim();
  const ending_time = document.querySelector('#ending_time').value.trim();

  if (name && description && starting_time && ending_time) {
    const response = await fetch(`/api/tasks`, {
      method: 'POST',
      body: JSON.stringify({ name, description, starting_time, ending_time }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create task');
    }
  }
};



document
  .querySelector('.new-Task-form')
  .addEventListener('submit', newFormHandler); //To Do - fix this event listener

