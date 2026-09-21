# Support CRM

A modern full-stack Customer Support CRM application for managing support tickets, customers, priorities, assignments, statuses, internal notes, and ticket activity through a clean and responsive dashboard.

## 🚀 Live Demo

**Frontend:**
https://support-crm-chi.vercel.app/

**Backend API:**
https://support-crm-production-9149.up.railway.app/

---

## 📌 Overview

Support CRM is a full-stack customer support management system designed to streamline ticket handling and support operations.

The application provides a centralized dashboard where support agents can:

* Create and manage support tickets
* Track ticket status and priority
* Assign tickets to support agents
* Add internal notes
* Manage tags and related tickets
* View customer information
* Search and filter tickets
* Monitor ticket activity
* Work with live backend API data

The frontend is built with React and TypeScript, while the backend provides RESTful APIs using FastAPI.

---

## ✨ Features

### 🎫 Ticket Management

* Create new support tickets
* View complete ticket details
* Update ticket status
* Update priority
* Assign tickets
* Add internal notes
* Manage tags
* Manage related tickets
* Track ticket creation and update timestamps

### 👥 Customer Management

* Customer profiles
* Customer contact information
* Company information
* Customer-related ticket data

### 🔎 Search & Filtering

* Global ticket search
* Search by ticket ID
* Search by customer
* Search by subject
* Filter by status
* Filter by priority
* Filter by assignee
* Filter by customer
* Filter urgent and unassigned tickets

### 📊 Dashboard

* Overview dashboard
* Ticket statistics
* Analytics
* Customer overview
* Support activity tracking

### 🔄 REST API Integration

The frontend communicates with the FastAPI backend through REST APIs.

Supported operations include:

* `GET /api/tickets`
* `POST /api/tickets`
* `GET /api/tickets/{ticket_id}`
* `PUT /api/tickets/{ticket_id}`

---

## 🛠️ Tech Stack

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

### Development Tools

* Git
* GitHub
* VS Code
* Vercel
* Railway

---

## 🏗️ Project Architecture

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
│   └── ...
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

Make sure you have installed:

* Node.js
* npm
* Python 3.x
* Git

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

### Backend Setup

```bash
cd backend
python -m venv venv
```

Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the API:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 🔌 API Example

### Get all tickets

```http
GET /api/tickets
```

### Get a specific ticket

```http
GET /api/tickets/TKT-0001
```

### Create a ticket

```http
POST /api/tickets
```

```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Unable to login",
  "description": "Customer is unable to access the account.",
  "status": "Open",
  "priority": "High"
}
```

### Update a ticket

```http
PUT /api/tickets/TKT-0001
```

```json
{
  "notes": "Customer contacted support and issue is being investigated."
}
```

---

## 🖼️ Screenshots

Screenshots are available in:

```text
docs/screenshots/
```

Add screenshots of:

* Dashboard
* Ticket Management
* Ticket Details
* Analytics
* Customer Management

---

## 🌐 Deployment

### Frontend

Deployed using **Vercel**.

### Backend

Deployed using **Railway**.

```text
┌──────────────────────┐
│      User Browser    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   React + Vite       │
│       Vercel         │
└──────────┬───────────┘
           │ REST API
           ▼
┌──────────────────────┐
│       FastAPI        │
│       Railway        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       SQLite         │
└──────────────────────┘
```

---

## 📈 Future Improvements

* Authentication and role-based access
* JWT authentication
* PostgreSQL database
* Email notifications
* File attachments
* Advanced analytics
* Agent performance reports
* Customer communication history
* Real-time ticket updates
* Docker containerization
* Automated testing
* CI/CD pipeline

---

## 👨‍💻 Author

### Om Sharma

**Software Developer | BCA**

Passionate about building modern web applications, full-stack systems, and intuitive user experiences.

### Connect With Me

📧 **Email:**
[Som758510@gmail.com](mailto:Som758510@gmail.com)

💼 **LinkedIn:**
https://www.linkedin.com/in/omsharma2004/

🔗 **GitHub:**
https://github.com/OMsharma200429

### Interests

* Java
* Spring Boot
* React
* Full-Stack Development
* UI/UX Design
* AI & Modern Web Technologies

---

## 📄 License

This project is developed for learning, portfolio, and demonstration purposes.
