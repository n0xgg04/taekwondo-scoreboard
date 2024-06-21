import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type StateType = {
    offsetTop: number
    counter: number
    status: "not-start-yet" | "started" | "paused"
    isRealtime: boolean
    redPoint: number
    bluePoint: number
    redWarn: number
    blueWarn: number
    redWin: number
    blueWin: number
    redCity: string
    blueCity: string
    contestName: string
    round: number
    match: string
    defaultCounter: number
}

const initialState: StateType = {
    offsetTop: 0,
    defaultCounter: 120,
    counter: 120,
    redWarn: 0,
    redWin: 0,
    blueWarn: 0,
    blueWin: 0,
    round: 1,
    status: "not-start-yet",
    isRealtime: false,
    match: "001",
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
        setDefaultCounter: (state, action) => {
            state.defaultCounter = action.payload
        },
        setStatus: (status, action: PayloadAction<StateType["status"]>) => {
            status.status = action.payload
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
        setRedWarn: (state, action) => {
            state.redWarn = action.payload
        },
        setRedWin: (state, action) => {
            state.redWin = action.payload
        },
        setBlueWarn: (state, action) => {
            state.blueWarn = action.payload
        },
        setBlueWin: (state, action) => {
            state.blueWin = action.payload
        },
        setMatch: (state, action) => {
            state.match = action.payload
        },
        setRound: (state, action) => {
            state.round = action.payload
        },
    },
})

export { slice as AppSlice }
