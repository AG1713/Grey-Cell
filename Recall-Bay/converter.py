from sentence_transformers import SentenceTransformer

model = SentenceTransformer("BAAI/bge-small-en-v1.5")

def text_to_vector(query: str):
    return model.encode(query).tolist()
