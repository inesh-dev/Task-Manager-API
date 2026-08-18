const fs = require('fs');
const path = require('path');
const request = require('supertest');
const app = require('../src/app');

const DATA_FILE = path.join(__dirname, '../src/data/tasks.json');

// Reset the storage file before every test so tests never depend on each other
beforeEach(() => {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
});

afterAll(() => {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
});

describe('Task API', () => {
   describe('POST /api/tasks', () => {
    it('should create a new task with valid data', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'Write tests', description: 'Add Jest tests' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe('Write tests');
      expect(res.body.description).toBe('Add Jest tests');
      expect(res.body.completed).toBe(false);
      expect(res.body).toHaveProperty('createdAt');
    });

    it('should return 400 when title is missing', async () => {
      const res = await request(app).post('/api/tasks').send({ description: 'No title here' });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Validation Error');
    });

    it('should return 400 when title is an empty string', async () => {
      const res = await request(app).post('/api/tasks').send({ title: '   ' });
      expect(res.statusCode).toBe(400);
    });
  });
  describe('GET /api/tasks', () => {
    it('should return an empty array when no tasks exist', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should return all created tasks', async () => {
      await request(app).post('/api/tasks').send({ title: 'Task 1' });
      await request(app).post('/api/tasks').send({ title: 'Task 2' });

      const res = await request(app).get('/api/tasks');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a single task by id', async () => {
      const createRes = await request(app).post('/api/tasks').send({ title: 'Find me' });
      const { id } = createRes.body;

      const res = await request(app).get(`/api/tasks/${id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(id);
    });

    it('should return 404 for a non-existent task', async () => {
      const res = await request(app).get('/api/tasks/does-not-exist');
      expect(res.statusCode).toBe(404);
    });
  });
  describe('PUT /api/tasks/:id', () => {
    it('should update an existing task', async () => {
      const createRes = await request(app).post('/api/tasks').send({ title: 'Old title' });
      const { id } = createRes.body;

      const res = await request(app)
        .put(`/api/tasks/${id}`)
        .send({ title: 'New title', completed: true });

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('New title');
      expect(res.body.completed).toBe(true);
    });

    it('should return 404 when updating a non-existent task', async () => {
      const res = await request(app).put('/api/tasks/does-not-exist').send({ title: 'x' });
      expect(res.statusCode).toBe(404);
    });

    it('should return 400 when completed is not a boolean', async () => {
      const createRes = await request(app).post('/api/tasks').send({ title: 'Task' });
      const { id } = createRes.body;

      const res = await request(app).put(`/api/tasks/${id}`).send({ completed: 'yes' });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete an existing task', async () => {
      const createRes = await request(app).post('/api/tasks').send({ title: 'Delete me' });
      const { id } = createRes.body;

      const res = await request(app).delete(`/api/tasks/${id}`);
      expect(res.statusCode).toBe(204);

      const getRes = await request(app).get(`/api/tasks/${id}`);
      expect(getRes.statusCode).toBe(404);
    });

    it('should return 404 when deleting a non-existent task', async () => {
      const res = await request(app).delete('/api/tasks/does-not-exist');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('Unknown routes', () => {
    it('should return 404 for a route that does not exist', async () => {
      const res = await request(app).get('/api/unknown-route');
      expect(res.statusCode).toBe(404);
    });
  });
});