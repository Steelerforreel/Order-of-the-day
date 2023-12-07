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
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const starting_time = document.querySelector('#starting_time').value;
  const ending_time = document.querySelector('#ending_time').value;
  
  // TODO: What will the value of has_nuts be if the box in the form is checked? 
  // TODO: What do we call this kind of operator?
  const has_completed = document.querySelector('#has_completed:checked') ? true : false;

// window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  console.log(id);

  // TODO: What part of our application will handle this 'put' request?
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      description,
      starting_time,
      ending_time,
      has_completed
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // TODO: What happens if the response is ok?
  if (response.ok) {
    document.location.replace(`/tasks/${id}`);
  } else {
    alert('Failed to edit task');
  }
}

document.querySelector('.edit-task-form').addEventListener('submit', editFormHandler);
