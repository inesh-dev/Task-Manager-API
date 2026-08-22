# Team Task Manager API

A small, beginner-friendly REST API for managing tasks, built for a university lab
assessment. It demonstrates Git/GitHub workflow, Docker containerization, CI with
automated testing, clean code structure, Swagger API documentation, and test coverage
reporting.

## Tech stack

- Node.js + Express.js
- JSON file for storage (no database, by design)
- Jest + Supertest for automated testing
- Swagger / OpenAPI for documentation
- Docker for containerization
- GitHub Actions for CI

## Project structure

```
Task-Manager-API/
├── src/
│   ├── app.js                  # Express app setup
│   ├── server.js                # Entry point, starts the server
│   ├── routes/taskRoutes.js     # Route definitions
│   ├── controllers/taskController.js  # Request/response handling
│   ├── services/taskService.js  # Business logic + JSON file storage
│   ├── middleware/
│   │   ├── validateTask.js      # Input validation
│   │   └── errorHandler.js      # Centralized error handling
│   ├── data/tasks.json          # Data storage file
│   └── swagger/
│       ├── swagger.yaml         # OpenAPI spec
│       └── swagger.js           # Loads the spec for swagger-ui-express
├── tests/task.test.js           # Jest + Supertest test suite
├── .github/workflows/ci.yml     # GitHub Actions CI pipeline
├── Dockerfile
├── .dockerignore
├── .gitignore
├── jest.config.js
└── package.json
```

## Setup

```bash
git clone https://github.com/inesh-dev/Task-Manager-API.git
cd Task-Manager-API
npm install
```

## Running the app

```bash
npm start
```
The API runs at `http://localhost:3000`. Swagger docs at `http://localhost:3000/api-docs`.

## API endpoints

| Method | Endpoint             | Description          | Success | Errors |
|--------|-----------------------|-----------------------|---------|--------|
| GET    | `/api/tasks`           | List all tasks        | 200     | —      |
| GET    | `/api/tasks/:id`       | Get one task           | 200     | 404    |
| POST   | `/api/tasks`           | Create a task          | 201     | 400    |
| PUT    | `/api/tasks/:id`       | Update a task          | 200     | 400, 404 |
| DELETE | `/api/tasks/:id`       | Delete a task          | 204     | 404    |

**Task object:**
```json
{
  "id": "uuid",
  "title": "string (required)",
  "description": "string",
  "completed": false,
  "createdAt": "ISO date string"
}
```

Full interactive documentation: **`/api-docs`** (Swagger UI), generated from
`src/swagger/swagger.yaml`.

## Testing

```bash
npm test
```
Runs the full Jest + Supertest suite and prints a coverage table. An HTML coverage
report is generated at `coverage/lcov-report/index.html` — open it in a browser for a
line-by-line view.

## Docker

Build the image:
```bash
docker build -t Task-Manager-API .
```

Run the container:
```bash
docker run -p 3000:3000 Task-Manager-API
```
The API is now available at `http://localhost:3000` on your host machine.

## Continuous Integration

Every push and every pull request to `main` or `develop` triggers `.github/workflows/ci.yml`,
which installs dependencies with `npm ci` and runs `npm test`. The coverage report is
uploaded as a downloadable workflow artifact. Check the **Actions** tab on GitHub to see
run history.

## Team contributions

- **Inesh Pokhrel:** project structure, task CRUD API, input validation, error handling.
- **Saksham Pokhrel:** automated tests, coverage configuration, Swagger/OpenAPI docs.
- **Sangam Parajuli:** Docker, GitHub Actions CI, README, clean-code pass, integration.
