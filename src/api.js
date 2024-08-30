// src/api.js

const TaskAPI = (() => {
    const baseURL = 'https://to-do-vuup.onrender.com/api/to-do-tasks'; // Base URL for the API

    // Fetch tasks from Strapi
    async function fetchTasks() {
        try {
            const response = await fetch(baseURL);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();

            // Assuming the API returns an array of tasks in data.data
            return data.data.map(task => ({
                id: task.id,
                title: task.attributes.Tasks
            }));
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return [];
        }
    }

    // Add a new task to Strapi
    async function addTask(taskTitle) {
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: { Tasks: taskTitle }
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            const data = await response.json();
            return {
                id: data.data.id,
                title: data.data.attributes.Tasks
            };
        } catch (error) {
            console.error('Error adding task:', error);
            return null;
        }
    }

    // Delete a task from Strapi
    async function deleteTask(taskId) {
        try {
            const response = await fetch(`${baseURL}/${taskId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            return true;
        } catch (error) {
            console.error('Error deleting task:', error);
            return false;
        }
    }

    // Expose the functions
    return {
        fetchTasks,
        addTask,
        deleteTask
    };
})();

export default TaskAPI;