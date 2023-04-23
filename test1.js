// Update form submission
const updateForm = document.getElementById('update-form');
updateForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = event.target.elements.name.value;
  const age = event.target.elements.age.value;
  const email = event.target.elements.email.value;

  try {
    const response = await fetch('https://api.github.com/repos/username/repo/contents/data.json', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa('admin_username:admin_password')
      }
    });
    const data = await response.json();
    const newData = {
      name,
      age,
      email
    };
    const existingData = JSON.parse(atob(data.content));
    existingData.push(newData);
    const content = btoa(JSON.stringify(existingData));
    const sha = data.sha;
    await fetch('https://api.github.com/repos/username/repo/contents/data.json', {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic ' + btoa('admin_username:admin_password')
      },
      body: JSON.stringify({
        message: 'Update virtual database',
        content,
        sha
      })
    });
    document.getElementById('message').textContent = 'Data updated successfully.';
    document.getElementById('update-form').reset();
  } catch (error) {
    console.error(error);
    document.getElementById('message').textContent = 'Error updating data.';
  }
});

// View form submission
const viewForm = document.getElementById('view-form');
viewForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = event.target.elements.username.value;
  const password = event.target.elements.password.value;

  try {
    const response = await fetch('https://api.github.com/repos/username/repo/contents/data.json', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      }
    });
    const data = await response.json();
    const content = atob(data.content);
    const jsonData = JSON.parse(content);
    let tableHtml = '<tr><th>Name</th><th>Age</th><th>Email</th></tr>';
    jsonData.forEach((row) => {
      tableHtml += `<tr><td>${row.name}</td><td>${row.age}</td><td>${row.email}</td></tr>`;
    });
    document.getElementById('data-table').innerHTML = tableHtml;
    document.getElementById('view-message').textContent = 'Data retrieved successfully.';
    document.getElementById('view-form').reset();
  } catch (error) {
    console.error(error);
    document.getElementById('view-message').textContent = 'Error retrieving data.';
  }
});

// Search form submission
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = event.target.elements['name'].value;

  try {
    const response = await fetch('https://api.github.com/repos/username/repo/contents/data.json', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa('username:password')
      }
    });
    const data = await response.json();
    const content = atob(data.content);
    const jsonData = JSON.parse(content);
    const row = jsonData.find((item) => item.name === name);
    let tableHtml = '<tr><th>Name</th><th>Age</th><th>Email</th></tr>';
    if (row) {
      tableHtml
