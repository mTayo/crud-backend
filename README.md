# 🧠 Task Manager Backend

This is the **backend API** for a Task Manager Application built with:

- **Node.js** + **Express**
- **Prisma ORM** (MySQL)
- **JWT Authentication**
- **Modular Architecture** (routes, controllers, services, repositories)
- **DTOs and Validation**
- **RESTful Endpoints**
- **Task Analytics**

---

## 🔧 Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL
- JWT
- Bcrypt
- Class-validator + class-transformer

---

## 📁 Folder Structure

```
src/
├── modules/
│   ├── auth/
│   └── tasks/
├── middlewares/
├── utils/
├── config/
├── types/
└── server.ts
```

---

## 🔐 Features

- ✅ User registration & login
- ✅ JWT-based authentication
- ✅ Create, update, delete tasks
- ✅ Filter tasks by status, due date, created date
- ✅ Update task status from dropdown
- ✅ Task metrics/analytics
- ✅ Class-based input validation
- ✅ Centralized response formatting

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/task-manager-backend.git
cd task-manager-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=7000
JWT_SECRET=your_secret_here
DATABASE_URL=mysql://user:password@localhost:3306/your_database
```

### 4. Run Prisma setup

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start development server

```bash
npm run dev
```

---

## 📮 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| POST   | `/api/auth/signup` | Register user      |
| POST   | `/api/auth/login`  | Login & get token  |

---

### 📋 Task Routes (Protected)

All routes below require a Bearer JWT token.

| Method | Endpoint                   | Description               |
|--------|----------------------------|---------------------------|
| GET    | `/api/task`                | Get all tasks             |
| POST   | `/api/task`                | Create a new task         |
| GET    | `/api/task/:taskId`        | Get a single task         |
| PUT    | `/api/task/:taskId`        | Update a task             |
| DELETE | `/api/task/:taskId`        | Delete a task             |
| PATCH  | `/api/task/:taskId/status` | Update task status only   |
| GET    | `/api/task/metrics`        | Task analytics (count by status) |

---

## 🔍 Filtering Tasks

Supports filters via query parameters:

```http
GET /api/task?status=PENDING&dueDate=2025-07-20&createdAt=2025-07-10
```

---

## 📊 Metrics Example

`GET /api/task/metrics` returns:

```json
{
  "total": 20,
  "pending": 8,
  "inProgress": 5,
  "done": 7
}
```

---

## 🧪 Testing

You can test the API with:

- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/)
- cURL or your frontend

Make sure to pass the token in headers:

```http
Authorization: Bearer <your_token>
```

---

## 🚀 Deployment Suggestions

- [Render](https://render.com)
- [Railway](https://railway.app)
- [DigitalOcean Droplets](https://www.digitalocean.com/)
- [VPS + PM2 + NGINX]
- Docker (optional)

Be sure to set your environment variables in the dashboard.

---

## 🧹 Future Improvements

- [ ] Pagination and search
- [ ] Role-based access control (RBAC)
- [ ] Cron job to remind users of task due dates
- [ ] Add profile endpoints
- [ ] Rate limiting
- [ ] Tests (unit & integration)

---

## 📄 License

MIT © 2025 [Adinlewa Tayo Michael]
