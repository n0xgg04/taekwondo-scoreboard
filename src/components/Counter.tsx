import * as React from "react"
import { useAppSelector } from "@/hooks/useAppSelector.tsx"
import useWindowSize from "@/hooks/useWindowSize.tsx"
import { parseToMin } from "@/utils/time-parser.ts"
import { socket } from "@/config"
import { AppSlice } from "@/stores/slices/app.slice.ts"
import { useAppDispatch } from "@/hooks/useAppDispatch.tsx"

type Props = {}

export default function Counter() {
    const state = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch()

    const [timeLeft, setTimeLeft] = React.useState(state.counter)

    React.useEffect(() => {
        socket.on("set_counter", (data) => {
            setTimeLeft(data)
            dispatch(AppSlice.actions.setCounter(data))
        })

        socket.on("reset", (data) => {
            setTimeLeft(data["battle_time"])
            dispatch(AppSlice.actions.setCounter(data["battle_time"]))
        })
    })

    React.useEffect(() => {
        const timer = setInterval(() => {
            if (state.status === "paused" || state.status === "not-start-yet")
                return
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft > 0) {
                    socket.emit("controller_sync_time", prevTimeLeft - 1)
                    return prevTimeLeft - 1
                } else {
                    clearInterval(timer)
                    return 0
                }
            })
        }, 1000)

        socket.on("set_counter", () => {
            clearInterval(timer)
        })

        return () => clearInterval(timer)
    }, [state.counter, state.status])

    return (
        <div className="w-full h-[35%] bg-round grid place-items-center">
            <p className="text-[8rem] text-black font-bold">
                {parseToMin(timeLeft)}
            </p>
        </div>
    )
}
