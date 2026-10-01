from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
import ollama

from app.database.database import get_db
from app.database.models import GeneratedQuiz
from app.rag.retrieve import retrieve_chunks

router = APIRouter(prefix="/quiz", tags=["Quiz"])


class QuizRequest(BaseModel):
    topic: str
    difficulty: str = "Medium"
    number_of_questions: int = 10


@router.post("/")
async def generate_quiz(
    data: QuizRequest,
    db: Session = Depends(get_db)
):

    try:
        if not data.topic.strip():
            raise HTTPException(
                status_code=400,
                detail="Topic is required"
            )

        result = retrieve_chunks(data.topic)

        documents = result.get("documents", [])

        if not documents:
            raise HTTPException(
                status_code=404,
                detail="No relevant content found"
            )

        context = "\n\n".join(documents)

        prompt = f"""
You are an Engineering Professor.

Using ONLY the context below, generate {data.number_of_questions}
multiple-choice questions.

Difficulty: {data.difficulty}

Each question must contain:

Question
A)
B)
C)
D)

Correct Answer

Context:

{context}
"""

        response = ollama.chat(
            model="gemma3:1b",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        quiz = response["message"]["content"]

        # Save quiz information
        generated_quiz = GeneratedQuiz(
            topic=data.topic,
            difficulty=data.difficulty
        )

        db.add(generated_quiz)
        db.commit()
        db.refresh(generated_quiz)

        return {
            "quiz": quiz,
            "topic": data.topic,
            "difficulty": data.difficulty,
            "number_of_questions": data.number_of_questions
        }

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()
        print("QUIZ ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )