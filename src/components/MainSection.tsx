import * as React from "react"
import ScoreLayout from "@/components/ScoreLayout.tsx"
import VietnamFlag from "@/assets/vn-flag.png"
import { useAppSelector } from "@/hooks/useAppSelector.tsx"
import { socket } from "@/config"
import { useAppDispatch } from "@/hooks/useAppDispatch.tsx"
import { AppSlice } from "@/stores/slices/app.slice.ts"

type Props = {}
export default function MainSection(props: Props) {
    const state = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        socket.on("inc_point_blue", (point: number) => {
            dispatch(AppSlice.actions.setBluePoint(state.bluePoint + point))
        })

        socket.on("inc_point_red", (point: number) => {
            dispatch(AppSlice.actions.setRedPoint(state.redPoint + point))
        })

        socket.on("action_red", (action: "+1L" | "-1L") => {
            if (action == "+1L")
                dispatch(AppSlice.actions.setRedWarn(state.redWarn + 1))
            else dispatch(AppSlice.actions.setRedWarn(state.redWarn - 1))
        })

        socket.on("action_blue", (action: "+1L" | "-1L") => {
            console.log("Action blue la", action)
            if (action == "+1L")
                dispatch(AppSlice.actions.setBlueWarn(state.blueWarn + 1))
            else dispatch(AppSlice.actions.setBlueWarn(state.blueWarn - 1))
        })

        socket.on("up_red", () => {
            dispatch(AppSlice.actions.setRedWin(state.redWin + 1))
        })

        socket.on("up_blue", () => {
            dispatch(AppSlice.actions.setBlueWin(state.blueWin + 1))
        })

        socket.on("reset_all", () => {
            dispatch(AppSlice.actions.setStatus("not-start-yet"))
            dispatch(AppSlice.actions.setBluePoint(0))
            dispatch(AppSlice.actions.setCounter(0))
            dispatch(AppSlice.actions.setRedPoint(0))
            dispatch(AppSlice.actions.setCounter(120))
        })
    }, [
        state.redPoint,
        state.bluePoint,
        state.status,
        state.bluePoint,
        state.blueWarn,
        state.redPoint,
        state.redWarn,
        state.redWin,
        state.blueWin,
    ])

    React.useEffect(() => {
        socket.on("change_name_blue", (city: string) => {
            dispatch(AppSlice.actions.setBlueCity(city))
        })

        socket.on("change_name_red", (city: string) => {
            dispatch(AppSlice.actions.setRedCity(city))
        })
    }, [
        state.blueCity,
        state.redCity,
        state.bluePoint,
        state.blueWarn,
        state.redPoint,
        state.redWarn,
        state.redWin,
        state.blueWin,
    ])

    return (
        <>
            <div className="basis-1/2 bg-blue-200 bg-gradient-to-r from-blue-start to-blue-end to-90%">
                <ScoreLayout
                    city={state.blueCity}
                    scores={state.bluePoint}
                    win={state.blueWin}
                    warn={state.blueWarn}
                    flag={
                        <img
                            className="box-border border-4 border-solid border-gray-200"
                            alt="flag-1"
                            src={VietnamFlag}
                        />
                    }
                />
            </div>
            <div className="basis-1/2 bg-red-200 from-10% bg-gradient-to-r from-red-end to-red-start">
                <ScoreLayout
                    city={state.redCity}
                    scores={state.redPoint}
                    win={state.redWin}
                    warn={state.redWarn}
                    float="right"
                    flag={
                        <img
                            className="box-border border-4 border-solid border-gray-200"
                            alt="flag-1"
                            src={VietnamFlag}
                        />
                    }
                />
            </div>
        </>
    )
}
