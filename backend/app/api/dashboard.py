from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.models import (
    Document,
    ChatHistory,
    GeneratedNote,
    GeneratedQuiz
)

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):

    books = db.query(Document).count()
    questions = db.query(ChatHistory).count()
    notes = db.query(GeneratedNote).count()
    quizzes = db.query(GeneratedQuiz).count()

    return {
        "books": books,
        "questions": questions,
        "notes": notes,
        "quizzes": quizzes
    }