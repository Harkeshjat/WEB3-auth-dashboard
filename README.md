# WEB3 Auth Dashboard

This project is built as part of the Frontend Developer Internship assignment.

## Project Overview
This is a scalable full-stack web application with authentication and a dashboard.
Users can register, login and manage tasks with secure JWT based access.

## Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB

Authentication:
- JWT (JSON Web Token)

-------

## Features

Frontend:
- Login & Register UI
- Form validation
- Protected routes
- Dashboard with tasks
- Search & filter tasks
- Logout functionality

Backend:
- User authentication
- JWT token generation
- Password hashing using bcrypt
- Secure API routes
- CRUD APIs for tasks
- Profile API

------

## How to run the project

### Backend
### Frontend



------

## API Routes

### Auth
POST /api/auth/register  
POST /api/auth/login  
GET /api/auth/profile  
PUT /api/auth/profile  

### Tasks
GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id  

------

## Security
- Passwords are encrypted
- JWT token used for authorization
- Secrets stored in environment variables

------

## Scalability
- Clean folder architecture
- Separate frontend and backend
- Cloud ready
- Can be deployed on Vercel / Render / AWS

------

## Author
Harkesh
