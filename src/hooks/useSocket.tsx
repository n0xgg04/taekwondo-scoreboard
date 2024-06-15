import * as React from "react"
import { socket } from "@/config"
import { useAppSelector } from "@/hooks/useAppSelector.tsx"
import { useAppDispatch } from "@/hooks/useAppDispatch.tsx"
import { AppSlice } from "@/stores/slices/app.slice.ts"

export default function useSocket() {
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        socket.on("connect", () => {
            dispatch(AppSlice.actions.setRealtime(true))
        })

        socket.on("connect_error", (e) => {
            dispatch(AppSlice.actions.setRealtime(false))
        })

        socket.on("error", (e) => {
            console.log(e)
        })
    }, [socket])
}
