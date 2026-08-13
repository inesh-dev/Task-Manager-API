const express = require('express');

const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Team Task Manager API is running.' });
});

app.use('/api/tasks', taskRoutes);

module.exports = app