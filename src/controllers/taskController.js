const taskService = require('../services/taskService');

function getAllTasks(req, res) {
  const tasks = taskService.getAllTasks();
  res.status(200).json(tasks);
}

function getTaskById(req, res) {
  const task = taskService.getTaskById(req.params.id);

  if (!task) {
    return res
      .status(404)
      .json({ error: 'Not Found', message: `Task with id ${req.params.id} not found` });
  }

  res.status(200).json(task);
}

function createTask(req, res) {
  const { title, description, completed } = req.body;
  const newTask = taskService.createTask({ title, description, completed });
  res.status(201).json(newTask);
}

function updateTask(req, res) {
  const updatedTask = taskService.updateTask(req.params.id, req.body);

  if (!updatedTask) {
    return res
      .status(404)
      .json({ error: 'Not Found', message: `Task with id ${req.params.id} not found` });
  }

  res.status(200).json(updatedTask);
}

function deleteTask(req, res) {
  const wasDeleted = taskService.deleteTask(req.params.id);

  if (!wasDeleted) {
    return res
      .status(404)
      .json({ error: 'Not Found', message: `Task with id ${req.params.id} not found` });
  }

 
  res.status(200).send();
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };