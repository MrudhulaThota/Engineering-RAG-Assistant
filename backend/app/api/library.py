from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.crud import get_documents

router = APIRouter(tags=["Library"])


@router.get("/library")
def library(db: Session = Depends(get_db)):

    return get_documents(db)