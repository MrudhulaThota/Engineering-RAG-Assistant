from sentence_transformers import SentenceTransformer

# Load embedding model only once
embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def generate_embeddings(chunks):
    """
    Convert list of text chunks into embeddings.
    """
    return embedding_model.encode(
        chunks,
        convert_to_numpy=True
    )