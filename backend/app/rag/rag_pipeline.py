from app.rag.retriever import retrieve_context
from app.llm.ollama_service import ask_llm


def ask_question(question: str):

    context = retrieve_context(question)

    prompt = f"""
You are an expert Engineering Professor.

Rules:

1. Answer ONLY from the provided textbook context.
2. Do not invent information.
3. If the answer is missing, say:
   "Answer not found in the uploaded textbook."
4. Explain clearly.
5. Use bullet points whenever appropriate.

Context:
{context}

Question:
{question}

Answer:
"""

    answer = ask_llm(prompt)

    return answer