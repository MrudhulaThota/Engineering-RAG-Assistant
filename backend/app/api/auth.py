from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.schemas import UserCreate
from app.database.crud import (
    get_user_by_email,
    create_user
)
from app.auth.hashing import hash_password

from app.auth.hashing import verify_password
from app.auth.jwt_handler import create_access_token
from fastapi.security import OAuth2PasswordRequestForm

from app.auth.oauth2 import get_current_user
router = APIRouter(tags=["Authentication"])


@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing = get_user_by_email(
        db,
        user.email
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed = hash_password(
        user.password
    )

    create_user(
        db,
        user.full_name,
        user.email,
        hashed
    )

    return {
        "message": "Registration Successful"
    }

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    db_user = get_user_by_email(db, form_data.username)

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email"
        )

    if not verify_password(
        form_data.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
@router.get("/profile")
def profile(current_user: str = Depends(get_current_user)):
    return {
        "email": current_user,
        "message": "Welcome to Offline RAG System"
    }