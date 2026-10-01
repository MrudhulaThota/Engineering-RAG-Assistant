import chromadb

# Create a persistent ChromaDB client
client = chromadb.PersistentClient(path="chroma_db")

# Create or load the collection
collection = client.get_or_create_collection(
    name="engineering_books"
)