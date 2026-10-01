from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import os
import fitz  # PyMuPDF

from app.database.database import get_db
from app.database.models import Document
from app.rag.save_chunks import split_text, save_chunks
from app.rag.vector_store import add_to_vector_store

router = APIRouter(prefix="/upload", tags=["Upload"])

# -----------------------------
# Directories
# -----------------------------
UPLOAD_DIR = "uploads"
TEXT_DIR = "extracted_text"
CHUNK_DIR = "chunks"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(TEXT_DIR, exist_ok=True)
os.makedirs(CHUNK_DIR, exist_ok=True)


@router.post("/pdf")
async def upload_pdf(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:

        # -----------------------------
        # Check file
        # -----------------------------
        if not file.filename:
            raise HTTPException(
                status_code=400,
                detail="No file selected"
            )

        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed"
            )

        # -----------------------------
        # Save PDF
        # -----------------------------
        pdf_path = os.path.join(
            UPLOAD_DIR,
            file.filename
        )

        file_content = await file.read()

        with open(pdf_path, "wb") as f:
            f.write(file_content)

        # -----------------------------
        # Extract Text
        # -----------------------------
        pdf = fitz.open(pdf_path)

        page_count = pdf.page_count

        text = ""

        for page in pdf:
            text += page.get_text()

        pdf.close()

        # -----------------------------
        # Check extracted text
        # -----------------------------
        if not text.strip():
            raise HTTPException(
                status_code=400,
                detail="No readable text found in PDF"
            )

        # -----------------------------
        # Save Extracted Text
        # -----------------------------
        txt_filename = os.path.splitext(
            file.filename
        )[0] + ".txt"

        txt_path = os.path.join(
            TEXT_DIR,
            txt_filename
        )

        with open(
            txt_path,
            "w",
            encoding="utf-8"
        ) as f:
            f.write(text)

        # -----------------------------
        # Split into Chunks
        # -----------------------------
        chunks = split_text(text)

        if not chunks:
            raise HTTPException(
                status_code=400,
                detail="Could not create text chunks"
            )

        # -----------------------------
        # Save Chunks
        # -----------------------------
        save_chunks(
            file.filename,
            chunks
        )

        # -----------------------------
        # Store Embeddings in ChromaDB
        # -----------------------------
        add_to_vector_store(
            file.filename,
            chunks
        )

        # -----------------------------
        # Save Document in SQLite
        # -----------------------------
        document = Document(
            filename=file.filename,
            filepath=pdf_path
        )

        db.add(document)
        db.commit()
        db.refresh(document)

        # -----------------------------
        # Response
        # -----------------------------
        return {
            "message": "PDF uploaded successfully",
            "filename": file.filename,
            "pages": page_count,
            "chunks": len(chunks)
        }

    except HTTPException:
        db.rollback()
        raise
    except Exception as e:
        db.rollback()

        print("====================================")
        print("UPLOAD ERROR:")
        print(repr(e))
        print("====================================")

        raise HTTPException(
            status_code=500,
            detail=str(e)
    )