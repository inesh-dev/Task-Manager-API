const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '../data/tasks.json');

/**
 * Read all tasks from the JSON file.
 * Returns an empty array if the file is empty or unreadable.
 */
function readTasks() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return raw ? JSON.parse(raw) : [];
}

/**
 * Persist the given tasks array back to the JSON file.
 */
function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

function getAllTasks() {
  return readTasks();
}

function getTaskById(id) {
  const tasks = readTasks();
  return tasks.find((task) => task.id === id);
}

function createTask({ title, description, completed }) {
  const tasks = readTasks();

  const newTask = {
    id: uuidv4(),
    title,
    description: description || '',
    completed: completed || false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  writeTasks(tasks);
  return newTask;
}

function updateTask(id, updates) {
  const tasks = readTasks();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return null;
  }

  const existingTask = tasks[index];
  const updatedTask = {
    ...existingTask,
    title: updates.title !== undefined ? updates.title : existingTask.title,
    description:
      updates.description !== undefined ? updates.description : existingTask.description,
    completed: updates.completed !== undefined ? updates.completed : existingTask.completed,
  };

  tasks[index] = updatedTask;
  writeTasks(tasks);
  return updatedTask;
}

function deleteTask(id) {
  const tasks = readTasks();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  writeTasks(tasks);
  return true;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};