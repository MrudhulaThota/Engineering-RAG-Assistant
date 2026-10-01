from sqlalchemy.orm import Session
from app.database.models import ChatHistory


def save_chat(db: Session, question: str, answer: str, source: str):
    chat = ChatHistory(
        question=question,
        answer=answer,
        source=source
    )

    db.add(chat)
    db.commit()
    db.refresh(chat)

    return chat


def get_chat_history(db: Session):
    return (
        db.query(ChatHistory)
        .order_by(ChatHistory.id.desc())
        .all()
    )


def get_chat_by_id(db: Session, chat_id: int):
    return (
        db.query(ChatHistory)
        .filter(ChatHistory.id == chat_id)
        .first()
    )


def delete_chat(db: Session, chat_id: int):
    chat = (
        db.query(ChatHistory)
        .filter(ChatHistory.id == chat_id)
        .first()
    )

    if chat:
        db.delete(chat)
        db.commit()

    return chat


def clear_chat_history(db: Session):
    db.query(ChatHistory).delete()
    db.commit()

    return {"message": "Chat history cleared successfully."}