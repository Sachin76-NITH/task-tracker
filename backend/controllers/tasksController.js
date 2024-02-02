// tasksController.js
const express = require('express');
const mongoose = require('mongoose'); // Import mongoose

const Task = require('../models/tasks');

// Get all tasks
module.exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single task by ID
module.exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new task
module.exports.createTask = async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    const newTask = new Task({ title, isCompleted });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a task by ID
module.exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid Task ID' });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid Task ID format' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a task by ID
module.exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid Task ID' });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid Task ID format' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

