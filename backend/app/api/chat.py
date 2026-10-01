from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import ollama

from app.database.database import get_db
from app.database.chat_crud import save_chat
from app.rag.retrieve import retrieve_chunks
from app.schemas.chat import ChatRequest


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/")
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db)
):

    try:

        # -----------------------------
        # Get question
        # -----------------------------
        question = request.question.strip()

        if not question:
            raise HTTPException(
                status_code=400,
                detail="Question cannot be empty"
            )

        # -----------------------------
        # Retrieve relevant chunks
        # -----------------------------
        retrieved = retrieve_chunks(question)

        documents = retrieved.get("documents", [])
        metadata = retrieved.get("metadata", [])

        if not documents:
            raise HTTPException(
                status_code=404,
                detail="No relevant information found"
            )

        # -----------------------------
        # Create context
        # -----------------------------
        context = "\n\n".join(documents)

        # -----------------------------
        # Prompt
        # -----------------------------
        prompt = f"""
You are an AI tutor for engineering students.

Answer ONLY using the provided context.

Context:
{context}

Question:
{question}

Give a clear and concise answer suitable for an engineering student.
"""

        # -----------------------------
        # Generate answer
        # -----------------------------
        response = ollama.chat(
            model="gemma3:1b",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        answer = response["message"]["content"]

        # -----------------------------
        # Get source
        # -----------------------------
        source = "Unknown"

        if metadata:
            source = metadata[0].get(
                "filename",
                "Unknown"
            )

        # -----------------------------
        # Save chat history
        # -----------------------------
        save_chat(
            db=db,
            question=question,
            answer=answer,
            source=source
        )

        # -----------------------------
        # Return response
        # -----------------------------
        return {
            "answer": answer,
            "source": source
        }

    except HTTPException:
        raise

    except Exception as e:

        db.rollback()

        print("CHAT ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )