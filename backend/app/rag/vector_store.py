import chromadb

from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(path="chroma_db")

collection = client.get_or_create_collection(
    name="engineering_books"
)

from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "all-MiniLM-L6-v2",
    local_files_only=True
)

def add_to_vector_store(filename, chunks):

    for i, chunk in enumerate(chunks):

        embedding = model.encode(chunk).tolist()

        collection.add(
            ids=[f"{filename}_{i}"],
            documents=[chunk],
            embeddings=[embedding],
            metadatas=[
                {
                    "filename": filename,
                    "chunk": i
                }
            ]
        )


def search(query, top_k=5):

    embedding = model.encode(query).tolist()

    results = collection.query(
        query_embeddings=[embedding],
        n_results=top_k
    )

    return results