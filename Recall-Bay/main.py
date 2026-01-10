from fastapi import FastAPI
from pydantic import BaseModel

from vector_store import setup_collection, insert_points, search_similar
from converter import text_to_vector
from splitter import query_splitter
from summarizer import summarize

# Imp commands
# to run the server - uvicorn main:app --reload
# to activate the virtual environment - venv\Scripts\activate
# to run python commands on terminal temporarily - Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

app = FastAPI()

class TextList(BaseModel):
    texts: list[str]
    discussion_id: int

class Query(BaseModel):
    query: str
    discussion_id: int
    top_k: int = 20


@app.on_event("startup")
async def startup_event():
    setup_collection()


@app.post("/store")
def store_texts(data: TextList):
    embeddings = [text_to_vector(text) for text in data.texts]
    insert_points(discussion_id=data.discussion_id, texts=data.texts, embeddings=embeddings)
    return {"status": "stored", "count": len(data.texts)}

@app.post("/search")
def search_query(qry: Query):
    """
    Summarizes text only if it exceeds a certain length.
    The summary ratio adapts automatically based on input size.

    Args:
        text (str): Input text to possibly summarize.
        min_words (int): Minimum word count before summarization is triggered.
        target_size (int): Desired approximate size (in words) of the output summary.

    Returns:
        str: Either the original text (if short) or its summarized version.
    """

    chunks = query_splitter(qry.query)
    output = []
    seen_texts = set()
    ans = ""

    for q in chunks:
        query_vector = text_to_vector(q)
        results = search_similar(discussion_id=qry.discussion_id, query_embedding=query_vector, top_k=qry.top_k)
        arr = []

        for r in results:
            if r.payload["text"] not in seen_texts:
                seen_texts.add(r.payload["text"])
                arr.append({"score": r.score, "text": r.payload["text"]})
        
        output.append(arr)
    
    print(output)
        
    target = ""
    for result in output:
        for entry in result:
            target += entry['text'] + " "
    
    # Summarize only if it’s long enough
    ans = target
    word_count = len(target.split())
    if word_count > 250:
        summary_ratio = min(0.3, 1000 / word_count)
        ans = summarize(text=ans, ratio=summary_ratio)

    return {
        "result":ans
        }

@app.post("/semantic-summary")
def search_and_summarize(qry: Query):
    chunks = query_splitter(qry.query)

    seen_texts = set()
    target = ""

    for q in chunks:
        query_vector = text_to_vector(q)
        results = search_similar(discussion_id=qry.discussion_id, query_embedding=query_vector, top_k=qry.top_k)

        for r in results:
            print(r)
            if r.payload["text"] not in seen_texts:
                seen_texts.add(r.payload["text"])
                target += r.payload["text"]
    
    if (target.strip() == ""):
        return "No context"
    
    # This is purposefully done in a separate for loop, so that,
    # last chunk context should not get inserted before the next chunk search
    for q in chunks:
        query_vector = text_to_vector(q)
        insert_points(qry.discussion_id, [q], [query_vector])
    
    print(target)
    summary = summarize(text=target, do_sample=False)
    return summary
