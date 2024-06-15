import * as React from "react"
import { HiPause } from "react-icons/hi2"
import { useAppSelector } from "@/hooks/useAppSelector.tsx"
import { FaPlay } from "react-icons/fa"
import { useAppDispatch } from "@/hooks/useAppDispatch.tsx"
import { AppSlice } from "@/stores/slices/app.slice.ts"
import { twMerge } from "tailwind-merge"
import { socket } from "@/config"

type Props = {}
export default function CenterButtonController() {
    const dispatch = useAppDispatch()
    const state = useAppSelector((s) => s.app)

    const handleChangeStatus = React.useCallback(() => {
        let res: typeof state.status
        if (state.status != "started") res = "started"
        else res = "paused"
        socket.emit("controller_change_status", res)
        dispatch(AppSlice.actions.setStatus(res))
    }, [state.status])

    return (
        <div
            onClick={handleChangeStatus}
            className={twMerge(
                "transtion-all duration-300 ease-in active:scale-110  absolute z-2 grid place-items-center top-1/2 left-1/2 -translate-y-1/2 border-[4px] border-black -translate-x-1/2 w-[100px] h-[100px] aspect-square bg-white rotate-45",
                state.status == "started"
                    ? "active:bg-red-300"
                    : "active:bg-green-300",
            )}
        >
            <div className="w-full grid place-items-center h-full -rotate-45">
                <RenderIcon />
            </div>
        </div>
    )
}

function RenderIcon() {
    const state = useAppSelector((s) => s.app)
    if (state.status == "started") {
        return <HiPause size={60} />
    }
    return <FaPlay size={40} />
}
