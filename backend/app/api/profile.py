from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.models import User, Document, ChatHistory, GeneratedNote


router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.get("/")
def profile(db: Session = Depends(get_db)):

    user = db.query(User).first()

    if not user:
        return {
            "name": "User",
            "email": "",
            "books": 0,
            "questions": 0,
            "notes": 0,
            "quizzes": 0
        }

    books = db.query(Document).count()
    questions = db.query(ChatHistory).count()
    notes = db.query(GeneratedNote).count()

    return {
        "name": user.username,
        "email": user.email,
        "books": books,
        "questions": questions,
        "notes": notes,
        "quizzes": 0
    }