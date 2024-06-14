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
    }, [state.redPoint, state.bluePoint])

    React.useEffect(() => {
        socket.on("change_name_blue", (city: string) => {
            dispatch(AppSlice.actions.setBlueCity(city))
        })

        socket.on("change_name_red", (city: string) => {
            dispatch(AppSlice.actions.setRedCity(city))
        })
    }, [state.blueCity, state.redCity])

    return (
        <>
            <div className="basis-1/2 bg-blue-200 bg-gradient-to-r from-blue-start to-blue-end to-90%">
                <ScoreLayout
                    city={state.blueCity}
                    scores={state.bluePoint}
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
