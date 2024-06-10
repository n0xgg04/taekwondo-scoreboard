import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    offsetTop: 0,
    counter: 120,
}

const slice = createSlice({
    name: "App",
    initialState,
    reducers: {
        setOffset: (state, action) => {
            state.offsetTop = action.payload
        },
        setCounter: (state, action) => {
            state.counter = action.payload
        },
    },
})

export { slice as AppSlice }
