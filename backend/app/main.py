from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine
from app.database.models import Base

from app.api.auth import router as auth_router
from app.api.upload import router as upload_router
from app.api.library import router as library_router
from app.api.chat import router as chat_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Offline RAG-Based Q&A System",
    description="Offline AI Assistant for Engineering Textbooks",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(library_router)
from app.api.library import router as library_router

app.include_router(library_router)
from app.api.upload import router as upload_router

app.include_router(upload_router)
@app.get("/")
def home():
    return {"message": "Offline RAG API Running"}

from app.api.chat import router as chat_router

app.include_router(chat_router)
@app.get("/health")
def health():
    return {"status": "Healthy"}
from app.api.notes import router as notes_router

app.include_router(notes_router)
from app.api.quiz import router as quiz_router

app.include_router(quiz_router)


from fastapi.staticfiles import StaticFiles

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)
from app.api.dashboard import router as dashboard_router

app.include_router(dashboard_router)
from app.api.profile import router as profile_router

app.include_router(profile_router)

from app.api.history import router as history_router

app.include_router(history_router)