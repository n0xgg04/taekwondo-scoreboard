import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    offsetTop: 0,
}

const slice = createSlice({
    name: "App",
    initialState,
    reducers: {
        setOffset: (state, action) => {
            state.offsetTop = action.payload
        },
    },
})

export { slice as AppSlice }
