from app.rag.chunker import split_text

text = """
Artificial Intelligence is one of the fastest growing fields.

""" * 200

chunks = split_text(text)

print("Total Chunks:", len(chunks))

for i, chunk in enumerate(chunks[:3]):
    print(f"\nChunk {i+1}")
    print(chunk)