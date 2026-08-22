const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger/swagger');
const taskRoutes = require('./routes/taskRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

// Swagger / OpenAPI documentation UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Simple root route to confirm the API is running
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Team Task Manager API is running. Visit /api-docs for documentation.',
  });
});

// Task routes
app.use('/api/tasks', taskRoutes);

// 404 handler for unknown routes (must come after all valid routes)
app.use(notFoundHandler);

// Centralized error handler (must be registered last)
app.use(errorHandler);

module.exports = app;
