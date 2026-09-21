from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database_init import init_database
from app.routes import router as ticket_router


# =====================================================
# DATABASE INITIALIZATION
# =====================================================

init_database()


# =====================================================
# FASTAPI APP
# =====================================================

app = FastAPI(
    title="Support CRM API",
    description="Customer Support Ticketing CRM API",
    version="1.0.0",
)


# =====================================================
# CORS CONFIGURATION
# =====================================================

origins = [
    # Local development
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",

    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",

    # Production Vercel frontend
    "https://frontend-three-psi-oyid8p4g16.vercel.app",
]


app.add_middleware(
    CORSMiddleware,

    allow_origins=origins,

    allow_credentials=True,

    allow_methods=[
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
    ],

    allow_headers=[
        "Accept",
        "Authorization",
        "Content-Type",
        "Origin",
        "X-Requested-With",
    ],
)


# =====================================================
# ROUTES
# =====================================================

app.include_router(ticket_router)


# =====================================================
# ROOT HEALTH CHECK
# =====================================================

@app.get("/")
def root():
    return {
        "message": "Support CRM API is running",
        "status": "success",
    }