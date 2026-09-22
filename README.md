# Support CRM

> A modern full-stack Customer Support CRM for managing tickets, customers, priorities, assignments, statuses, internal notes, and support activity through a clean and responsive interface.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://frontend-three-psi-oyid8p4g16.vercel.app/)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61DAFB?style=for-the-badge)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge)](https://fastapi.tiangolo.com/)
[![Database](https://img.shields.io/badge/Database-SQLite-003B57?style=for-the-badge)](https://www.sqlite.org/)
[![Deployment](https://img.shields.io/badge/Deployed-Vercel%20%2B%20Railway-000000?style=for-the-badge)](https://vercel.com/)

---

## 🎥 Demo Video

Watch the complete walkthrough and working demonstration of the Support CRM:

**[▶️ Support CRM — Datastraw Technologies Assessment Demo](https://youtu.be/vKO6oPwKPD0)**

The demo covers:

* CRM dashboard
* Ticket creation and management
* Search and filtering
* Ticket details and status updates
* Internal notes
* Frontend–backend integration
* REST API workflow
* Production deployment

---

## 🌐 Live Application

**Frontend**

https://frontend-three-psi-oyid8p4g16.vercel.app/

**Backend API**

https://support-crm-production-9149.up.railway.app/

**Interactive API Documentation**

https://support-crm-production-9149.up.railway.app/docs

---

## 📖 Overview

**Support CRM** is a full-stack customer support ticketing system designed to provide a centralized workspace for managing customer issues and support operations.

The application connects a responsive React frontend with a FastAPI REST backend and SQLite database, allowing support data to be created, retrieved, searched, filtered, updated, and persisted through a production deployment.

This project was developed as part of a **technical hiring assessment for the AI + Tech Intern position at Datastraw Technologies**.

The project focuses on demonstrating end-to-end development, including frontend development, backend API design, database integration, responsive UI development, and production deployment.

---

## ✨ Key Features

### 🎫 Ticket Management

* Create new support tickets
* Automatically generate ticket IDs
* Automatically record ticket timestamps
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

* Global ticket search
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

## 🏗️ System Architecture

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

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend will be available at:

```text
http://localhost:5173
```

---

### 3. Backend Setup

Open a new terminal and navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

#### Windows

Activate the virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

Backend will be available at:

```text
http://127.0.0.1:8000
```

---

## 📚 API Documentation

The backend uses FastAPI's automatically generated interactive documentation.

### Local API Documentation

```text
http://127.0.0.1:8000/docs
```

### Production API Documentation

https://support-crm-production-9149.up.railway.app/docs

The Swagger UI can be used to inspect and test the available REST API endpoints.

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

### Get All Tickets

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

Project screenshots are stored in:

```text
docs/screenshots/
```

Recommended screenshots include:

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

### Production Architecture

```text
                    INTERNET
                        │
                        ▼
              ┌─────────────────┐
              │     Vercel      │
              │ React Frontend  │
              └────────┬────────┘
                       │
                     HTTPS
                       │
                       ▼
              ┌─────────────────┐
              │    Railway      │
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
* Search and filtering functionality
* Responsive dashboard interface
* Frontend–backend integration
* CORS configuration
* Interactive Swagger API documentation
* Production deployment using Vercel and Railway

---

## 🔐 Security & Configuration

Before deploying another instance of the application, review the following configuration areas:

* CORS configuration
* API base URL
* Environment variables
* Database configuration
* Production deployment settings

**Never commit passwords, API keys, authentication tokens, or other sensitive credentials to the repository.**

---

## 🔮 Future Improvements

With additional development time, the following capabilities could be introduced:

* Authentication and authorization
* Role-based access control
* JWT-based authentication
* PostgreSQL database migration
* Email notifications
* File attachments
* Advanced analytics
* Agent performance reports
* Customer communication history
* Real-time ticket updates
* Automated unit and integration testing
* Docker containerization
* CI/CD pipeline
* Audit logging

---

## 👨‍💻 Author

### Om Sharma

**Software Developer | BCA**

Passionate about building full-stack applications, solving practical problems, and creating clean and intuitive user experiences.

### 🔗 Connect With Me

| Platform     | Link                                                  |
| ------------ | ----------------------------------------------------- |
| 🌐 Portfolio | [Portfolio](https://om-portfolio-red.vercel.app/)     |
| 💼 LinkedIn  | [LinkedIn](https://www.linkedin.com/in/omsharma2004/) |
| 🐙 GitHub    | [GitHub](https://github.com/OMsharma200429)           |
| 📧 Email     | [Som758510@gmail.com](mailto:Som758510@gmail.com)     |

### Areas of Interest

* Java
* Spring Boot
* React
* Full-Stack Development
* REST APIs
* UI/UX Design
* AI & Modern Web Technologies

---

## ⭐ Project Links

| Resource             | Link                                                                  |
| -------------------- | --------------------------------------------------------------------- |
| 🚀 Live Application  | [Open Support CRM](https://frontend-three-psi-oyid8p4g16.vercel.app/) |
| 🎥 Demo Video        | [Watch on YouTube](https://youtu.be/vKO6oPwKPD0)                      |
| ⚙️ Backend API       | [Open API](https://support-crm-production-9149.up.railway.app/)       |
| 📚 API Documentation | [Swagger UI](https://support-crm-production-9149.up.railway.app/docs) |
| 💻 GitHub Repository | [View Source Code](https://github.com/OMsharma200429/support-crm)     |
| 💼 LinkedIn          | [Connect with Om](https://www.linkedin.com/in/omsharma2004/)          |
| 🌐 Portfolio         | [Visit Portfolio](https://om-portfolio-red.vercel.app/)               |


---


## 📄 License & Copyright

© 2026 Om Sharma. All rights reserved.

This project was developed as part of a technical hiring assessment and is published for portfolio and demonstration purposes.

The source code is publicly available for viewing and evaluation. Unauthorized copying, redistribution, modification, or commercial use of the source code is not permitted without prior permission from the author.

---

