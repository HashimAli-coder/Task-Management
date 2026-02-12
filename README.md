# Task Management System

A full-stack **Task Management System** built with **MERN stack** and a **React dashboard**.
This project demonstrates authentication, task CRUD, real-time statistics, bulk actions, filtering, and modern UI/UX design.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Assumptions](#assumptions)
7. [Known Issues / Limitations](#known-issues--limitations)
8. [Time Spent](#time-spent)

---

## Project Overview

* **Backend:** Node.js, Express.js, MongoDB Atlas
* **Frontend:** React, Tailwind CSS, React Icons
* **Features:**

  * User authentication (JWT, password hashing)
  * Task CRUD operations
  * Search, filter, sort tasks
  * Bulk operations (complete/delete)
  * Task statistics (total, pending, completed, overdue)
  * Responsive and professional dashboard
  * Overdue task highlighting

---

## Technologies Used

* **Backend:** Node.js, Express.js, Mongoose, bcrypt, JWT, dotenv
* **Frontend:** React, Tailwind CSS, React Router DOM, React Icons, Axios
* **Database:** MongoDB Atlas
* **Dev Tools:** VS Code, Postman, Nodemon, Git/GitHub

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Task_Management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

* Start the server:

```bash
npm run dev
```

* Default server runs on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

* Default frontend runs on: `http://localhost:3000` (Create React App)

### 4. Access the Dashboard

* Register a new user or login with existing credentials.
* Use the dashboard to create, edit, delete, filter, and manage tasks.

---

## Environment Variables

Create a `.env` file in the **backend** folder with the following variables:

```
PORT=5000
MONGO_URI=<Your MongoDB Atlas Connection String>
JWT_SECRET=<Your JWT Secret Key>
appName=<app_name>
JWT_EXPIRE=<duration>

```
# NOTE: 
I will share the .env file for /backend through email.


---

## API Endpoints

### Authentication

| Method | Endpoint           | Description       | Body/Params                 |
| ------ | ------------------ | ----------------- | --------------------------- |
| POST   | /api/auth/register | Register new user | `{ name, email, password }` |
| POST   | /api/auth/login    | Login user        | `{ email, password }`       |

### Tasks

| Method | Endpoint               | Description                          | Body/Params                                                                    |
| ------ | ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| POST   | /api/tasks             | Create a new task                    | `{ title, description, priority, status, dueDate }`                            |
| GET    | /api/tasks             | Get all tasks                        | Query params: `search`, `status`, `priority`, `startDate`, `endDate`, `sortBy` |
| GET    | /api/tasks/:id         | Get single task                      | URL param: `id`                                                                |
| PUT    | /api/tasks/:id         | Update a task                        | Body: any fields to update                                                     |
| DELETE | /api/tasks/:id         | Delete a task                        | URL param: `id`                                                                |
| PATCH  | /api/tasks/bulk-update | Bulk update tasks (complete, status) | `{ taskIds: [], updateFields: { status: 'completed' } }`                       |
| DELETE | /api/tasks/bulk-delete | Bulk delete tasks                    | `{ taskIds: [] }`                                                              |
| GET    | /api/tasks/stats       | Get task statistics                  | None                                                                           |

---

## Assumptions

* Users can only access and modify their own tasks.
* Task status is restricted to `pending`, `in-progress`, or `completed`.
* Priority is restricted to `low`, `medium`, `high`.
* All date fields are in ISO format (`YYYY-MM-DD`).
* Frontend assumes JWT is stored in `localStorage`.

---

## Known Issues / Limitations

* No email verification implemented.
* No real-time WebSocket updates; dashboard updates on state change only.
* Mobile responsiveness tested on common devices, but minor layout adjustments may be required for very small screens.
* No pagination on frontend by default (can be added for large task lists).

---

## Time Spent

* **Project duration:** 4:30-5:00 hours
* Backend setup and authentication: 2 hours
* Frontend components and dashboard: 2 hours
* Testing, debugging, AI-assisted problem-solving: 1 hours




