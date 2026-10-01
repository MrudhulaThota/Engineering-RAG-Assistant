from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


# =========================
# User
# =========================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)


# =========================
# Documents / Library
# =========================

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    filepath = Column(String(500), nullable=False)
    upload_date = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


# =========================
# Chat History
# =========================

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    source = Column(String(255), nullable=True)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


# =========================
# Generated Notes
# =========================

class GeneratedNote(Base):
    __tablename__ = "generated_notes"

    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String(255), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


# =========================
# Generated Quizzes
# =========================

class GeneratedQuiz(Base):
    __tablename__ = "generated_quizzes"

    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String(255), nullable=False)
    difficulty = Column(String(50), nullable=True)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )