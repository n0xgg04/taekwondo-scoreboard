import * as React from "react"
import FakeLogo from "@/assets/fake-logo.png"
import { IoMdSettings } from "react-icons/io"
import { socket } from "@/config"
import { useAppSelector } from "@/hooks/useAppSelector.tsx"
import { useAppDispatch } from "@/hooks/useAppDispatch.tsx"
import { AppSlice } from "@/stores/slices/app.slice.ts"

type Props = {
    battleTitle?: string
}
export default function Header({ battleTitle = "Tiêu đề trận đấu" }: Props) {
    const state = useAppSelector((s) => s.app)
    const dispatch = useAppDispatch()

    const handleToggleFullScreen = React.useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then()
        } else if (document.exitFullscreen) {
            document.exitFullscreen().then()
        }
    }, [])

    React.useEffect(() => {
        socket.on("change_contest_name", (name: string) =>
            dispatch(AppSlice.actions.setContestName(name)),
        )
    }, [state.contestName])

    return (
        <>
            <div className="flex flex-row gap-x-5 items-center basis-1/6">
                <img
                    className="transition-all duration-300 ease-in hover:drop-shadow-[0_0px_5px_red] drop-shadow-[0_0px_10px_red] h-[5rem]"
                    src={FakeLogo}
                    alt="Fake logo"
                />
            </div>
            <div className="basis-1/2">
                <p className="text-4xl text-center">{battleTitle}</p>
            </div>
            <div className="basis-1/6 flex justify-end">
                <IoMdSettings
                    onClick={handleToggleFullScreen}
                    className="transition-all duration-300 hover:rotate-45 ease-in hover:scale-125 cursor-pointer"
                    size={35}
                />
            </div>
        </>
    )
}
