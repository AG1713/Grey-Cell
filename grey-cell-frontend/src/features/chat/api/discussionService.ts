import { api } from "@/lib/axios"

export interface Discussion {
    id: number,
    name: string
}

export const createDiscussion = async (discussionName: string) => {
    await api.post("/discussions/", {
        discussionName
    })
}

export const getAllDiscussions = async () => {
    const response = await api.get<Discussion[]>("/discussions/")
    return response.data
}

export const getDiscussion = async (discussionId: number) => {
    const response = await api.get<Discussion>(`/discussions/${discussionId}`)
    return response.data
}