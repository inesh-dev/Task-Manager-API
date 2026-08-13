function validateTaskInput(req, res, next) {
  const { title, completed } = req.body;

  if (req.method === 'POST') {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Title is required and must be a non-empty string',
      });
    }
    // Bug: completed type is only checked for POST here — PUT has no check yet.
    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'completed must be a boolean value',
      });
    }
  }

  if (req.method === 'PUT') {
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Title must be a non-empty string when provided',
      });
    }
  }

  next();
}

module.exports = validateTaskInput;