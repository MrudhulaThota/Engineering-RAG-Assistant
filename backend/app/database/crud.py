from sqlalchemy.orm import Session

from .models import User, Document


# ----------------------------
# User CRUD
# ----------------------------

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(
        User.email == email
    ).first()


def create_user(
    db: Session,
    full_name: str,
    email: str,
    password: str
):
    user = User(
        full_name=full_name,
        email=email,
        password=password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


# ----------------------------
# Document CRUD
# ----------------------------

def create_document(
    db: Session,
    document: Document
):
    db.add(document)
    db.commit()
    db.refresh(document)

    return document


def get_documents(db: Session):
    return db.query(Document).all()