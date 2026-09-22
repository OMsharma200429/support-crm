# Support CRM

> A modern full-stack Customer Support CRM for managing tickets, customers, priorities, assignments, statuses, internal notes, and support activity through a clean and responsive interface.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://frontend-three-psi-oyid8p4g16.vercel.app/)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61DAFB?style=for-the-badge)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge)](https://fastapi.tiangolo.com/)
[![Database](https://img.shields.io/badge/Database-SQLite-003B57?style=for-the-badge)](https://www.sqlite.org/)
[![Deployment](https://img.shields.io/badge/Deployed-Vercel%20%2B%20Railway-000000?style=for-the-badge)](https://vercel.com/)

---

## 🌐 Live Application

**Frontend:**
https://frontend-three-psi-oyid8p4g16.vercel.app/

**Backend API:**
https://support-crm-production-9149.up.railway.app/

**API Documentation:**
https://support-crm-production-9149.up.railway.app/docs

---

## 📖 Overview

**Support CRM** is a full-stack customer support ticketing system designed to provide a centralized workspace for managing customer issues and support operations.

The application connects a responsive React frontend with a FastAPI REST backend and SQLite database, allowing support data to be created, retrieved, searched, filtered, updated, and persisted through a production deployment.

The project was developed as part of a **technical hiring assessment for the AI + Tech Intern position at Datastraw Technologies**.

---

## ✨ Key Features

### 🎫 Ticket Management

* Create new support tickets
* Automatically generate ticket IDs and timestamps
* View complete ticket details
* Update ticket status
* Update ticket priority
* Assign tickets to support agents
* Add internal notes
* Manage tags
* Manage related tickets
* Track ticket creation and update timestamps

### 👥 Customer Management

* Customer profiles
* Customer contact information
* Company information
* Customer-related ticket information

### 🔎 Search & Filtering

* Search tickets globally
* Search by ticket ID
* Search by customer
* Search by subject
* Filter by status
* Filter by priority
* Filter by assignee
* Filter by customer
* Filter urgent tickets
* Filter unassigned tickets

### 📊 Dashboard & Analytics

* Support dashboard
* Ticket statistics
* Ticket activity overview
* Customer overview
* Support analytics
* Ticket status distribution

### 📝 Support Activity

* Internal ticket notes
* Ticket updates
* Related ticket information
* Activity tracking

---

## 🛠️ Technology Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Framer Motion
* Lucide React
* Recharts

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic
* SQLite
* REST API
* CORS

### Development & Deployment

* Git
* GitHub
* Visual Studio Code
* Vercel
* Railway

---

## 🏗️ Architecture

```text
┌────────────────────────────┐
│        User Browser        │
└──────────────┬─────────────┘
               │
               ▼
┌────────────────────────────┐
│    React + TypeScript      │
│          Vercel            │
└──────────────┬─────────────┘
               │
               │ REST API
               ▼
┌────────────────────────────┐
│       Python + FastAPI     │
│          Railway           │
└──────────────┬─────────────┘
               │
               ▼
┌────────────────────────────┐
│          SQLite            │
└────────────────────────────┘
```

### Request Flow

```text
User Action
    ↓
React UI
    ↓
API Service Layer
    ↓
FastAPI Endpoint
    ↓
Database Operation
    ↓
SQLite
    ↓
API Response
    ↓
Updated React UI
```

---

## 📂 Project Structure

```text
support-crm/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes.py
│   │   ├── database_init.py
│   │   └── ...
│   │
│   └── requirements.txt
│
├── docs/
│   └── screenshots/
│
├── .gitignore
├── README.md
└── support_crm.db
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure the following are installed:

* [Node.js](https://nodejs.org/)
* npm
* Python 3.x
* Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/OMsharma200429/support-crm.git
cd support-crm
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

### 3. Backend Setup

Open a new terminal:

```bash
cd backend
python -m venv venv
```

#### Windows

```powershell
.\venv\Scripts\Activate.ps1
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Start FastAPI

```bash
uvicorn app.main:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

---

## 📚 API Documentation

FastAPI automatically provides interactive API documentation.

After starting the backend, open:

```text
http://127.0.0.1:8000/docs
```

For the deployed API:

https://support-crm-production-9149.up.railway.app/docs

---

## 🔌 REST API

### Create Ticket

```http
POST /api/tickets
```

Example request:

```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Unable to login",
  "description": "Customer is unable to access the account."
}
```

---

### Get Tickets

```http
GET /api/tickets
```

Optional query parameters:

```text
?status=Open
?search=John
```

---

### Get Ticket Details

```http
GET /api/tickets/{ticket_id}
```

Example:

```http
GET /api/tickets/TKT-0001
```

---

### Update Ticket

```http
PUT /api/tickets/{ticket_id}
```

Example:

```json
{
  "status": "In Progress",
  "notes": "Customer contacted support and issue is being investigated."
}
```

---

## 🖼️ Screenshots

Project screenshots are available in:

```text
docs/screenshots/
```

Recommended screenshots:

* Dashboard
* Ticket Management
* Ticket Details
* Create Ticket
* Search & Filtering
* Analytics
* Customer Management

---

## 🚀 Deployment

### Frontend

The React frontend is deployed using **Vercel**.

### Backend

The FastAPI backend is deployed using **Railway**.

### Production Flow

```text
                    INTERNET
                        │
                        ▼
              ┌─────────────────┐
              │   Vercel        │
              │ React Frontend  │
              └────────┬────────┘
                       │
                    HTTPS
                       │
                       ▼
              ┌─────────────────┐
              │   Railway       │
              │ FastAPI Backend │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │     SQLite      │
              │    Database     │
              └─────────────────┘
```

---

## 🧠 Technical Highlights

* Component-based React architecture
* Type-safe frontend development with TypeScript
* RESTful API communication
* FastAPI backend architecture
* SQLite-based persistent storage
* Search and filtering logic
* Responsive dashboard interface
* Production frontend/backend deployment
* CORS configuration for cross-origin API requests
* Interactive API documentation with Swagger UI

---

## 🔐 Security & Configuration

The project keeps environment-specific configuration separate from application code where applicable.

Before deploying your own instance, review:

* CORS configuration
* API base URL
* Environment variables
* Database configuration
* Production deployment settings

Never commit passwords, API keys, tokens, or other secrets to the repository.

---

## 🔮 Future Improvements

Potential improvements for a production-scale version include:

* Authentication and authorization
* Role-based access control
* JWT-based authentication
* PostgreSQL migration
* Email notifications
* File attachments
* Advanced analytics
* Agent performance reports
* Customer communication history
* Real-time ticket updates
* Automated testing
* Docker containerization
* CI/CD pipeline
* Audit logging

---

## 👨‍💻 Author

### Om Sharma

**Software Developer | BCA**

I enjoy building full-stack applications, solving practical problems, and creating clean and intuitive user experiences.

### 🔗 Connect With Me

| Platform     | Link                                              |
| ------------ | ------------------------------------------------- |
| 🌐 Portfolio | https://om-portfolio-red.vercel.app/              |
| 💼 LinkedIn  | https://www.linkedin.com/in/omsharma2004/         |
| 🐙 GitHub    | https://github.com/OMsharma200429                 |
| 📧 Email     | [Som758510@gmail.com](mailto:Som758510@gmail.com) |

### Areas of Interest

* Java
* Spring Boot
* React
* Full-Stack Development
* REST APIs
* UI/UX Design
* AI & Modern Web Technologies

---

## 📄 License & Copyright

© 2026 Om Sharma. All rights reserved.

This project was developed as part of a technical hiring assessment and is published for portfolio and demonstration purposes.

The source code is publicly available for viewing and evaluation. Unauthorized copying, redistribution, modification, or commercial use of the source code is not permitted without prior permission from the author.
