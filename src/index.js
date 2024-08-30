import TaskManager from './todo.js';

// Initialize the application by loading tasks from the API and rendering them
async function initializeTasks() {
    await TaskManager.renderTasks(); // Fetch tasks from the API and render them
}

document.getElementById('add-button').addEventListener('click', () => {
    const inputBox = document.getElementById('input-box');
    TaskManager.addTask(inputBox.value); // Add the task using the API
    inputBox.value = ''; // Clear the input box after adding the task
});

// Call the initialization function on page load
initializeTasks();