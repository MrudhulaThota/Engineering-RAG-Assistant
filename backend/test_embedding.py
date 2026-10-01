from app.rag.embedding import generate_embeddings

chunks = [
    "Artificial Intelligence is a branch of Computer Science.",
    "Machine Learning is a subset of AI."
]

embeddings = generate_embeddings(chunks)

print("Total Embeddings:", len(embeddings))
print("Embedding Dimension:", len(embeddings[0]))