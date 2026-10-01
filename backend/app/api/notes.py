from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
import ollama

from app.database.database import get_db
from app.database.models import GeneratedNote
from app.rag.retrieve import retrieve_chunks


router = APIRouter(
    prefix="/notes",
    tags=["Notes"]
)


class NotesRequest(BaseModel):
    topic: str


@router.post("/")
async def generate_notes(
    data: NotesRequest,
    db: Session = Depends(get_db)
):

    try:

        topic = data.topic

        if not topic.strip():
            raise HTTPException(
                status_code=400,
                detail="Topic is required"
            )

        # -----------------------------
        # Retrieve relevant chunks
        # -----------------------------
        result = retrieve_chunks(topic)

        documents = result.get("documents", [])

        if not documents:
            raise HTTPException(
                status_code=404,
                detail="No relevant content found"
            )

        context = "\n\n".join(documents)

        # -----------------------------
        # Create prompt
        # -----------------------------
        prompt = f"""
You are an Engineering Professor.

Prepare concise study notes from the provided context.

Context:

{context}

Topic:
{topic}

Requirements:

- Headings
- Bullet Points
- Important Definitions
- Key Concepts
- Advantages
- Disadvantages
- Examples
- Exam Tips

Only use the provided context.
"""

        # -----------------------------
        # Generate notes using Ollama
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

        notes = response["message"]["content"]

        # -----------------------------
        # Save note count
        # -----------------------------
        note = GeneratedNote(
            topic=topic
        )

        db.add(note)
        db.commit()
        db.refresh(note)

        # -----------------------------
        # Return response
        # -----------------------------
        return {
            "notes": notes,
            "topic": topic
        }

    except HTTPException:
        raise

    except Exception as e:

        db.rollback()

        print("NOTES ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )