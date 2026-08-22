const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const newPort = PORT + 1;
    console.warn(`Port ${PORT} is in use. Trying port ${newPort}...`);
    app.listen(newPort, () => {
      console.log(`Server running on http://localhost:${newPort}`);
    });
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});