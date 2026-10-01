import json
import os

CHUNK_FOLDER = "chunks"

os.makedirs(CHUNK_FOLDER, exist_ok=True)


def split_text(text, chunk_size=500):

    words = text.split()

    chunks = []

    for i in range(0, len(words), chunk_size):

        chunk = " ".join(words[i:i + chunk_size])

        chunks.append(chunk)

    return chunks


def save_chunks(filename, chunks):

    path = os.path.join(
        CHUNK_FOLDER,
        filename.replace(".pdf", ".json")
    )

    data = []

    for i, chunk in enumerate(chunks):

        data.append({
            "id": i,
            "text": chunk
        })

    with open(path, "w", encoding="utf-8") as f:

        json.dump(data, f, indent=4, ensure_ascii=False)

    return path