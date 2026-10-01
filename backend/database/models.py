from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)

    question = Column(Text, nullable=False)

    answer = Column(Text, nullable=False)

    source = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)