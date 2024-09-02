// src/api.js

const TaskAPI = (() => {
    const baseURL = 'https://to-do-tq0n.onrender.com/api/to-do-tasks'; // Base URL for the API
    const token = '20945c9bbeceda0bada4819d5b658064ec8072d3eb8d62c7e88d57ec87e3d8ce9752d0fc4bc0da4b63813a00543e2ba2e7363a7d11da70a174dda68c4493e47110b2c45517f64d03162b9e4673334b16a57e80d1ee4d36a990c334dcceb74f2f5cf3bd5bc52882fe13089d4686d6c82b8162bce19c4c714ded7c9d249e703e2b'; // Your API token

    // Fetch tasks from Strapi
    async function fetchTasks() {
        try {
            const response = await fetch(baseURL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
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
                    'Authorization': `Bearer ${token}`,
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
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
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
