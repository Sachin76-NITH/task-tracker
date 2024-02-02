import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5050';

const api = axios.create({
  baseURL: BASE_URL,
});

const Tracking = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const createTask = async () => {
    try {
      const response = await api.post('/tasks', { title: newTask, isCompleted: false });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      await api.put(`/tasks/${taskId}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? { ...task, ...updatedTask } : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleComplete = async (taskId, isCompleted) => {
    const updatedTask = { isCompleted: !isCompleted };
    updateTask(taskId, updatedTask);
  };

  return (
    <div className="container11">
      <h1>TASK TRACKER</h1>
      <div>
        <h2>Add Task</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createTask();
          }}
        >
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task name"
          />
          <button type="submit" className="primary">
            Add Task
          </button>
        </form>
      </div>
      
      <div>
      <h2>Task List</h2>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>
                  <button
                    onClick={() => setEditingTask(task)}
                    className="btn-delete"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleComplete(task._id, task.isCompleted)}
                    className={`btn-mark ${task.isCompleted ? 'completed' : 'incomplete'}`}
                  >
                    {task.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingTask && (
        <div>
          <h2>Edit Task</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateTask(editingTask._id, { title: editingTask.title, isCompleted: editingTask.isCompleted });
            }}
          >
            <input
              type="text"
              value={editingTask.title}
              onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
              placeholder="Task name"
            />
            <button type="submit" className="btn-update">
              Update Task
            </button>
            <button type="button" onClick={() => setEditingTask(null)} className="btn-cancel">
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Tracking;


