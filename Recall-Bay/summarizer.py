from transformers import pipeline

summarizer = pipeline("summarization")

def summarize(text, do_sample=False):
    return summarizer(text, do_sample=do_sample)