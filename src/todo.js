// src/todo.js
import TaskAPI from './api.js'; // Import the TaskAPI module

// Task Manager Module
const TaskManager = (() => {
    let taskList = []; // Private state

    async function renderTasks() {
        const listContainer = document.getElementById('list-container');
        listContainer.innerHTML = '';

        // Fetch tasks from the API
        taskList = await TaskAPI.fetchTasks();

        taskList.forEach((task, index) => {
            let li = document.createElement("li");
            li.textContent = task.title;
            li.addEventListener('click', () => toggleTask(index));
            
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            span.addEventListener('click', async (e) => {
                e.stopPropagation();
                await removeTask(task.id);
            });
            
            li.appendChild(span);
            listContainer.appendChild(li);
        });
    }

    async function addTask(task) {
        if (task === '') {
            alert("You must write something!");
            return;
        }

        const newTask = await TaskAPI.addTask(task);
        if (newTask) {
            taskList.push(newTask); // Add the new task to the list
            renderTasks();
        }
    }

    async function removeTask(taskId) {
        const success = await TaskAPI.deleteTask(taskId);
        if (success) {
            taskList = taskList.filter(task => task.id !== taskId); // Remove the task from the list
            renderTasks();
        }
    }

    function toggleTask(index) {
        const task = document.querySelectorAll('#list-container li')[index];
        task.classList.toggle('checked');
    }

    // Expose public methods
    return {
        addTask,
        removeTask,
        toggleTask,
        renderTasks
    };
})();

export default TaskManager;
