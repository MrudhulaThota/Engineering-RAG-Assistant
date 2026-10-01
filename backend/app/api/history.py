from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.chat_crud import (
    get_chat_history,
    get_chat_by_id,
    delete_chat,
    clear_chat_history
)

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.get("/")
def history(db: Session = Depends(get_db)):
    return get_chat_history(db)


@router.get("/{chat_id}")
def history_by_id(chat_id: int, db: Session = Depends(get_db)):
    chat = get_chat_by_id(db, chat_id)

    if not chat:
        return {
            "message": "Chat not found"
        }

    return chat


@router.delete("/{chat_id}")
def delete(chat_id: int, db: Session = Depends(get_db)):
    chat = delete_chat(db, chat_id)

    if not chat:
        return {
            "message": "Chat not found"
        }

    return {
        "message": "Chat deleted successfully"
    }


@router.delete("/clear/all")
def clear(db: Session = Depends(get_db)):
    return clear_chat_history(db)