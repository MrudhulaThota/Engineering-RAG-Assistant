from app.rag.vector_store import collection
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")


def retrieve_chunks(question):

    embedding = model.encode(question).tolist()

    results = collection.query(
        query_embeddings=[embedding],
        n_results=3
    )

    return {
        "documents": results["documents"][0],
        "metadata": results["metadatas"][0]
    }