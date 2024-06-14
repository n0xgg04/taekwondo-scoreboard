import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type StateType = {
    offsetTop: number
    counter: number
    status: "not-start-yet" | "started" | "paused"
    isRealtime: boolean
    redPoint: number
    bluePoint: number
    redCity: string
    blueCity: string
    contestName: string
}

const initialState: StateType = {
    offsetTop: 0,
    counter: 120,
    status: "not-start-yet",
    isRealtime: false,
    bluePoint: 0,
    redPoint: 0,
    redCity: "<Chưa đặt>",
    blueCity: "<Chưa đặt>",
    contestName: "",
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
        setPause: (state, action) => {
            state.status = action.payload
        },
        setRealtime: (state, action) => {
            state.isRealtime = action.payload
        },
        setRedPoint: (state, action) => {
            state.redPoint = action.payload
        },
        setBluePoint: (state, action) => {
            state.bluePoint = action.payload
        },
        setBlueCity: (state, action) => {
            state.blueCity = action.payload
        },
        setRedCity: (state, action) => {
            state.redCity = action.payload
        },
        setContestName: (state, action) => {
            state.contestName = action.payload
        },
    },
})

export { slice as AppSlice }
