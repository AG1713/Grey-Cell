from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, MatchValue


client = QdrantClient(url="http://localhost:6333")
collection_name = "my_collection"

def setup_collection():
    if not client.collection_exists(collection_name):
        client.create_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(
                size=384, # <--- CHANGE THIS to match your embedding model output! Currently  fine.
                distance=Distance.COSINE
            )
        )
        print(f"Collection '{collection_name}' created successfully!")
    else:
        print(f"Collection '{collection_name}' already exists.")

def insert_points(discussion_id, texts, embeddings):
    points = [
        PointStruct(id=i, vector=embeddings[i], payload={"text": texts[i], "discussion_id":discussion_id})
        for i in range(len(texts))
    ]
    client.upsert(collection_name=collection_name, points=points)

def search_similar(discussion_id, query_embedding, top_k=3):
    return client.query_points(
        collection_name=collection_name,
        query=query_embedding,
        limit=top_k,
        query_filter=Filter(
            must=[
                FieldCondition(
                    key="discussion_id",
                    match=MatchValue(value=discussion_id)
                )
            ]
        )
    ).points