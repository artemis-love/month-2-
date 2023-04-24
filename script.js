
// Update Form
const updateForm = document.getElementById("update-form");
const updateMessage = document.getElementById("message");

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;

  // Create data object
  const data = {
    name,
    age,
    email,
  };

  // Make POST request to update data
  fetch("https://api.artemis-love.github.io/test1/?name=diana+santiago", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
      Authorization: "token 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",
    },
    body: JSON.stringify({
      files: {
        "virtualdb.json": {
          content: JSON.stringify(data),
        },
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      updateMessage.textContent = "Data updated successfully";
      updateForm.reset();
    })
    .catch((error) => {
      updateMessage.textContent = "Error updating data";
    });
});

// View Form
const viewForm = document.getElementById("view-form");
const viewTable = document.getElementById("data-table");
const viewMessage = document.getElementById("view-message");

viewForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Authenticate user
  if (username !== "username" || password !== "password") {
    viewMessage.textContent = "Invalid username or password";
    return;
  }

  // Make GET request to fetch data
  fetch("https://api.artemis-love.github.io/test1/?name=diana+santiago")
    .then((response) => response.json())
    .then((data) => {
      const content = JSON.parse(data.files["virtualdb.json"].content);
      const headers = ["Name", "Age",
