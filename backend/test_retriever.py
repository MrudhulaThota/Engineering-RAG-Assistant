from app.rag.retriever import retrieve_context

question = "What is Computer Network?"

results = retrieve_context(question)

print("\nRetrieved Chunks:\n")

for i, chunk in enumerate(results, start=1):
    print(f"\nChunk {i}")
    print("-" * 60)
    print(chunk)