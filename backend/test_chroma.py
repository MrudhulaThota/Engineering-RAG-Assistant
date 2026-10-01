from app.rag.chroma_db import collection
from app.rag.embedding import embedding_model

query = "What is Computer Network?"

embedding = embedding_model.encode(query)

results = collection.query(
    query_embeddings=[embedding.tolist()],
    n_results=3
)

print(results["documents"])