const form = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const filterSelect = document.getElementById('filter'); // ← new line

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks with filtering
function renderTasks() {
  taskList.innerHTML = '';

  const selectedPriority = filterSelect.value;

  const filteredTasks = selectedPriority === "All"
    ? tasks
    : tasks.filter(task => task.priority === selectedPriority);

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');

    li.innerHTML = `
      <div class="info">
        <strong>${task.title}</strong> - ${task.priority}<br>
        ${task.description}<br>
        Due: ${task.dueDate || 'No date'}
      </div>
      <div class="actions">
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button class="delete" onclick="deleteTask(${index}, this)">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;

  if (title === "") {
    alert("Task title is required.");
    return;
  }

  tasks.push({ title, description, dueDate, priority });
  saveTasks();
  renderTasks();
  form.reset();
});

// Delete with animation
function deleteTask(index, button) {
  const listItem = button.closest('li');
  listItem.style.transition = 'opacity 0.4s ease';
  listItem.style.opacity = 0;

  setTimeout(() => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }, 400);
}

// Edit task
function editTask(index) {
  const task = tasks[index];

  document.getElementById('title').value = task.title;
  document.getElementById('description').value = task.description;
  document.getElementById('dueDate').value = task.dueDate;
  document.getElementById('priority').value = task.priority;

  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Filter logic
filterSelect.addEventListener('change', () => {
  renderTasks();
});

// Initial load
renderTasks();
