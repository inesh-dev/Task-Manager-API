const taskService = require('../services/taskService');
const { AppError } = require('../middleware/errorHandler');

function getAllTasks(req, res) {
  const tasks = taskService.getAllTasks();
  res.status(200).json(tasks);
}

function getTaskById(req, res, next) {
  const task = taskService.getTaskById(req.params.id);

  if (!task) {
    return next(new AppError(`Task with id ${req.params.id} not found`, 404));
  }

  res.status(200).json(task);
}

function createTask(req, res) {
  const { title, description, completed } = req.body;
  const newTask = taskService.createTask({ title, description, completed });
  res.status(201).json(newTask);
}

function updateTask(req, res, next) {
  const updatedTask = taskService.updateTask(req.params.id, req.body);

  if (!updatedTask) {
    return next(new AppError(`Task with id ${req.params.id} not found`, 404));
  }

  res.status(200).json(updatedTask);
}

function deleteTask(req, res, next) {
  const wasDeleted = taskService.deleteTask(req.params.id);

  if (!wasDeleted) {
    return next(new AppError(`Task with id ${req.params.id} not found`, 404));
  }

  res.status(200).send();
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};