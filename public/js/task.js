const action = document.querySelector('.del-task');

const delButtonHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/tasks/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/tasks');
      } else {
        alert('Failed to delete task');
      }
    }
  };

action.addEventListener("click", delButtonHandler);

async function editFormHandler(event) {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
  const id = event.target.getAttribute('data-id');
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const starting_time = document.querySelector('#starting_time').value;
  const ending_time = document.querySelector('#ending_time').value;
  const has_completed = document.querySelector('#has_completed:checked') ? true : false;

  const response = await fetch(`/api/tasks/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      description,
      starting_time,
      ending_time,
      has_completed,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace(`/tasks/${id}`);
  } else {
    alert('Failed to edit task');
  }
}
};

document.querySelector('.edit-task-form').addEventListener('click', editFormHandler);
