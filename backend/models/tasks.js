// tasks.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;
