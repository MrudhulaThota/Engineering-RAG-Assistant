import fitz
import os

TEXT_FOLDER = "extracted_text"

os.makedirs(TEXT_FOLDER, exist_ok=True)


def extract_text(pdf_path):

    doc = fitz.open(pdf_path)

    text = ""

    for page in doc:
        text += page.get_text()

    return text


def save_text(filename, text):

    txt_name = filename.replace(".pdf", ".txt")

    txt_path = os.path.join(TEXT_FOLDER, txt_name)

    with open(
        txt_path,
        "w",
        encoding="utf-8"
    ) as f:

        f.write(text)

    return txt_path