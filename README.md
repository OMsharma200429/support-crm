# 🚀 SupportCRM

### Modern Full-Stack Customer Support Ticketing CRM

SupportCRM is a modern full-stack customer support management system designed to help support teams manage tickets, customers, priorities, assignments, internal notes, and support workflows from a centralized dashboard.

The application uses a **React + TypeScript frontend**, **FastAPI backend**, and **SQLite database**, with the frontend and backend deployed separately for production.

---

## 🌐 Live Demo

### Frontend

**Live Application:**
https://frontend-three-psi-oyid8p4g16.vercel.app/

### Backend API

**Production API:**
https://support-crm-production-9149.up.railway.app/

### GitHub Repository

**Source Code:**
https://github.com/OMsharma200429/support-crm

---

## 📸 Project Preview

> Screenshots of the application will be added here.

### Dashboard

![SupportCRM Dashboard](docs/screenshots/dashboard.png)

### Ticket Management

![Ticket Management](docs/screenshots/tickets.png)

### Ticket Details

![Ticket Details](docs/screenshots/ticket-details.png)

### Analytics

![Analytics](docs/screenshots/analytics.png)

---

# ✨ Features

## 🎫 Ticket Management

* Create support tickets
* View support tickets
* View detailed ticket information
* Update ticket status
* Update ticket priority
* Assign tickets
* Add ticket tags
* Manage related tickets
* Add internal notes
* Persist notes through the backend API
* Track ticket creation and update timestamps
* Ticket activity history

---

## 👥 Customer Management

* Customer profiles
* Customer information
* Company information
* Customer email information
* Customer-ticket relationships
* Customer support history

---

## 📊 Dashboard & Analytics

* Support overview dashboard
* Ticket statistics
* Ticket status distribution
* Priority tracking
* Analytics dashboard
* Support activity information
* SLA information
* Resolution information

---

## 🔎 Search & Filtering

SupportCRM provides global search and filtering capabilities.

Users can search across:

* Ticket IDs
* Ticket titles
* Customers
* Tags
* Customer information

Tickets can also be filtered by:

* Status
* Priority
* Assignee
* Customer
* Ticket scope
* Urgent tickets
* Unassigned tickets
* My tickets

---

## 📝 Internal Notes

Support agents can add internal notes directly from the ticket detail page.

Notes are sent to the backend API and stored with the ticket.

Example:

```json
{
  "notes": "Customer confirmed that the issue has been resolved."
}
```

Notes remain available after refreshing the application because they are persisted through the backend.

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │       User          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Vercel        │
                         │  React + TypeScript │
                         └──────────┬──────────┘
                                    │
                              HTTPS REST API
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Railway       │
                         │       FastAPI       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       SQLite        │
                         │    Support CRM DB   │
                         └─────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

| Technology    | Purpose               |
| ------------- | --------------------- |
| React         | UI development        |
| TypeScript    | Type-safe development |
| Vite          | Frontend tooling      |
| React Router  | Application routing   |
| Framer Motion | UI animations         |
| Lucide React  | Icons                 |
| Recharts      | Data visualization    |

---

## Backend

| Technology | Purpose             |
| ---------- | ------------------- |
| Python     | Backend development |
| FastAPI    | REST API framework  |
| Uvicorn    | ASGI server         |
| Pydantic   | Data validation     |
| SQLite     | Database            |

---

## Development & Deployment

| Tool    | Purpose                 |
| ------- | ----------------------- |
| Git     | Version control         |
| GitHub  | Source code hosting     |
| VS Code | Development environment |
| Vercel  | Frontend deployment     |
| Railway | Backend deployment      |

---

# 📁 Project Structure

```text
support-crm/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── ...
│   │
│   ├── requirements.txt
│   └── ...
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
├── docs/
│   └── screenshots/
│
├── .gitignore
├── README.md
└── support_crm.db
```

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Python 3.11+
* Git

---

# 1️⃣ Clone the Repository

```bash
git clone https://github.com/OMsharma200429/support-crm.git

cd support-crm
```

---

# 2️⃣ Backend Setup

Navigate to the backend:

```powershell
cd backend
```

Create a virtual environment:

```powershell
python -m venv venv
```

Activate the virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Start the FastAPI server:

```powershell
uvicorn app.main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

---

# 3️⃣ Backend API Documentation

FastAPI automatically provides interactive API documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

You can use Swagger UI to test the API endpoints directly.

---

# 4️⃣ Frontend Setup

Open another terminal and navigate to the frontend:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔌 API Endpoints

## Get All Tickets

```http
GET /api/tickets
```

---

## Get Ticket

```http
GET /api/tickets/{ticket_id}
```

Example:

```text
GET /api/tickets/TKT-0004
```

---

## Create Ticket

```http
POST /api/tickets
```

Example request:

```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Unable to login",
  "description": "Customer cannot access the account.",
  "status": "Open",
  "priority": "High"
}
```

---

## Update Ticket

```http
PUT /api/tickets/{ticket_id}
```

Example:

```json
{
  "status": "Resolved"
}
```

---

## Add Internal Note

```http
PUT /api/tickets/{ticket_id}
```

Example:

```json
{
  "notes": "Customer confirmed the issue has been resolved."
}
```

---

# 🔄 Production Workflow

```text
Developer
    │
    ▼
GitHub
    │
    ├───────────────┐
    ▼               ▼
 Vercel           Railway
    │               │
    ▼               ▼
Frontend          Backend
React             FastAPI
    │               │
    └───────┬───────┘
            │
            ▼
         SQLite
```

---

# ☁️ Deployment

## Frontend — Vercel

The React frontend is deployed using Vercel.

Production frontend:

https://frontend-three-psi-oyid8p4g16.vercel.app/

---

## Backend — Railway

The FastAPI backend is deployed using Railway.

Production API:

https://support-crm-production-9149.up.railway.app/

---

# 🔐 CORS Configuration

Because the frontend and backend are deployed separately, the FastAPI backend uses CORS middleware.

Local development origins include:

```text
http://localhost:5173
http://localhost:5174
http://localhost:5175
http://127.0.0.1:5173
http://127.0.0.1:5174
http://127.0.0.1:5175
```

The production frontend is also configured as an allowed origin.

This enables the browser-based React application to communicate with the deployed FastAPI API.

---

# 🧪 Development Commands

### Frontend

Start development server:

```bash
npm run dev
```

Build production application:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

### Backend

Start FastAPI:

```bash
uvicorn app.main:app --reload
```

---

# 🎯 Project Objectives

The project was developed to demonstrate practical full-stack development skills including:

* React application development
* TypeScript
* REST API integration
* FastAPI backend development
* Database persistence
* CRUD operations
* Search and filtering
* Responsive dashboard development
* Frontend/backend communication
* CORS configuration
* Production deployment
* Git and GitHub workflow

---

# 🔮 Future Improvements

Planned improvements include:

* [ ] Authentication and authorization
* [ ] Role-based access control
* [ ] Agent management
* [ ] Real-time ticket updates
* [ ] Email integration
* [ ] File attachments
* [ ] Advanced analytics
* [ ] Audit logs
* [ ] Pagination
* [ ] Advanced ticket filtering
* [ ] Automated testing
* [ ] CI/CD pipeline
* [ ] PostgreSQL production database
* [ ] Docker support

---

# 🤝 Contributing

Contributions and suggestions are welcome.

### 1. Fork the repository

### 2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

### 3. Commit your changes

```bash
git add .

git commit -m "Add your feature"
```

### 4. Push the branch

```bash
git push origin feature/your-feature
```

### 5. Open a Pull Request

---

# 📄 License

This project is currently developed as a portfolio and learning project.

---

# 👨‍💻 Author

## Om Sharma

**BCA | Full-Stack Developer | Java Developer**

Interested in building modern web applications, backend systems, and practical software solutions.

### GitHub

https://github.com/OMsharma200429

### Project Repository

https://github.com/OMsharma200429/support-crm

---

# ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

<p align="center">
  Built with ❤️ using React, TypeScript, FastAPI & SQLite
</p>
