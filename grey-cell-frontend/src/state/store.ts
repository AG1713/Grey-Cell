import { configureStore } from "@reduxjs/toolkit"
import discussionsReducer from "./discussion/discussionSlice";

export const store = configureStore({
    reducer: {
        discussions: discussionsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch