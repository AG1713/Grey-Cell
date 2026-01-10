from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size = 200,
    chunk_overlap = 50,
    separators = ["\n\n", "\n", ".", " ", ""]
)

def query_splitter(query: str) -> list[str]:
    return splitter.split_text(query)