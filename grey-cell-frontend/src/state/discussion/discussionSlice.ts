import { createDiscussion, getAllDiscussions, type Discussion } from "@/features/chat/api/discussionService";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DiscussionsState {
    current: number
    list: Discussion[]
}

const initialState: DiscussionsState = {
    current: 1,
    list: []
}

// action
export const getDiscussions = createAsyncThunk(
    "discussions/getAllDiscussions",
    async () => {
        return getAllDiscussions()
    }
)

export const createNewDiscussion = createAsyncThunk(
    "discussions/createDiscussion",
    async (name: string) => {
        return createDiscussion(name)
    }
)

const discussionSlice = createSlice({
    name: "discussions",
    initialState: initialState,
    reducers:{
        setCurrentDiscussion: (state, action: PayloadAction<number>) => {
            state.current = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getDiscussions.pending, () => {
            console.log("Fetching discussions")
        }).addCase(getDiscussions.fulfilled, (state, action: PayloadAction<Discussion[]>) => {
            console.log("Discussions fetched")
            state.list = action.payload
        })

        builder.addCase(createNewDiscussion.pending, () => {
            console.log("Creating new discussion")
        })
        .addCase(createNewDiscussion.fulfilled, () => {
            console.log("New discussion created")
        })

    }
})

export default discussionSlice.reducer
export const { setCurrentDiscussion } = discussionSlice.actions;