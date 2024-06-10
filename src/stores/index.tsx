import { configureStore } from "@reduxjs/toolkit"
import { AppSlice } from "@/stores/slices/app.slice.ts"

export const store = configureStore({
    reducer: {
        app: AppSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
