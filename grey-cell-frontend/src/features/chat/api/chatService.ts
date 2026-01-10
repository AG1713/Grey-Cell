import {api} from "@/lib/axios"

// Define what backend returns (The Data class)
export interface Message{
    id: number
    content: string,
    timestamp: string, // to be formated into Date
    author: string
}

export const fetchDiscussionHistory = async (discussionId: number) => {
    const response = await api.get<Message[]>("messages/discussion/"+discussionId);
    return response.data;
}

export const sendMessageToBackend = async (discussionId:number, prompt: string, provider: string) => {
    const response = await api.post("/messages/", {
        discussionId, prompt, provider});
    return response.data;
}