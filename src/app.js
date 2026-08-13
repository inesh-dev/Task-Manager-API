const express = require('express');

const taskRoutes = require('./routes/taskRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Team Task Manager API is running.' });
});

app.use('/api/tasks', taskRoutes);


app.use(notFoundHandler);


app.use(errorHandler);

module.exports = app;