import * as React from "react"
import { useSearchParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import { FiEdit } from "react-icons/fi"
import { ChangeEventHandler, createRef, useRef, useState } from "react"
import { TbClockCog } from "react-icons/tb"
import { MdEdit } from "react-icons/md"
import { twMerge } from "tailwind-merge"
import { GrPowerReset } from "react-icons/gr"
import CenterButtonController from "@/components/CenterButtonController.tsx"
import { FaRegClock } from "react-icons/fa"
import { IoTriangle } from "react-icons/io5"
import useSocket from "@/hooks/useSocket.tsx"
import { useDebounce } from "@uidotdev/usehooks"
import { socket } from "@/config"
import { parseToMin } from "@/utils/time-parser.ts"
import { AppSlice } from "@/stores/slices/app.slice.ts"
import { useAppDispatch } from "@/hooks/useAppDispatch.tsx"
import { useAppSelector } from "@/hooks/useAppSelector.tsx"
import { SetupModal } from "@/pages/scoreboard/SetupModal.tsx"

export default function ControllerPage() {
    useSocket()
    const dispatch = useAppDispatch()
    const [SearchParams] = useSearchParams()
    const [editing, setEditing] = React.useState<boolean>(false)
    const [contestName, setContestName] = React.useState<string>("Tên cuộc thi")
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showEditor, setShowEditor] = React.useState(false)
    const contestNameDebounce = useDebounce(contestName, 300)
    const [count, setCount] = useState(0)
    const state = useAppSelector((s) => s.app)

    const handleEditName = React.useCallback(() => {
        setEditing((p) => !p)
    }, [])

    const toggleEdit = React.useCallback(() => {
        setShowEditor((p) => !p)
        handleEditName()
    }, [showEditor])

    const handleOnEdit: ChangeEventHandler<HTMLInputElement> =
        React.useCallback(
            (event) => {
                setContestName(event.currentTarget.value)
            },
            [contestName],
        )

    const onPressEnter = (e: KeyboardEvent) => {
        if (e.code === "Enter") {
        }
    }

    React.useEffect(() => {
        if (editing) {
            inputRef.current?.focus()
            window.addEventListener("keypress", onPressEnter)
        } else {
            window.removeEventListener("keypress", onPressEnter)
        }
    })

    React.useEffect(() => {
        socket.emit("controller_change_contest_name", contestNameDebounce)
    }, [contestNameDebounce])

    React.useEffect(() => {
        socket.on("controller_sync_this", (time: string) => {
            setCount(Number(time))
        })
    }, [])

    return (
        <div className="select-none w-full h-full relative">
            <Helmet>
                <title>Điều khiển</title>
            </Helmet>
            <CenterButtonController />
            <div className="flex flex-row gap-x-2 items-center absolute bottom-5 right-5 bg-white/30 backdrop-blur-sm px-3 py-2 text-white rounded-lg">
                <FaRegClock color="white" />
                {parseToMin(count)}
            </div>
            <div
                className={twMerge(
                    "absolute transition-all duration-300 ease-in rounded-xl top-2 left-2 p-2 right-2 backdrop-blur-sm bg-white/30 flex flex-row justify-center items-center",
                    !showEditor ? " -translate-y-[120%]" : "",
                )}
            >
                <div className="size-full relative">
                    {!editing ? (
                        <p className="text-white text-center">{contestName}</p>
                    ) : (
                        <input
                            ref={inputRef}
                            onChange={handleOnEdit}
                            className="text-gray-50 bg-transparent placeholder:text-gray-50 text-center w-full focus:outline-0 focus:border-none"
                            value={contestName}
                            name="Name"
                            placeholder="Tên cuộc thi"
                        />
                    )}

                    <FiEdit
                        onClick={handleEditName}
                        color="#ffffff"
                        className="absolute right-0 top-1/2 -translate-y-1/2"
                    />
                </div>
            </div>
            <div className="absolute right-5 w-[20px] top-20 h-[30vh] flex flex-col items-center gap-2">
                <div
                    onClick={toggleEdit}
                    className="hover:scale-110 transition-all duration-300 ease-in bg-white/30 px-2 rounded-lg aspect-square backdrop-blur-sm grid place-items-center"
                >
                    <MdEdit size={20} color="white" />
                </div>
                <button className="hover:scale-110 transition-all duration-300 ease-in bg-white/30 px-2 rounded-lg aspect-square backdrop-blur-sm grid place-items-center">
                    <TbClockCog size={20} color="white" />
                </button>
                <button
                    onClick={() => {
                        console.log("Reset cho tao")
                        //! Da qua luoi r
                        dispatch(AppSlice.actions.setStatus("paused"))

                        socket.emit("reset")
                    }}
                    className="hover:scale-110 transition-all duration-300 ease-in bg-white/30 px-2 rounded-lg aspect-square backdrop-blur-sm grid place-items-center"
                >
                    <GrPowerReset size={20} color="white" />
                </button>
            </div>
            {/*IoTriangle*/}
            <div
                onClick={() => {
                    socket.emit("controller_up_blue")

                    dispatch(AppSlice.actions.setBlueWin(state.blueWin + 1))
                }}
                className="text-white absolute -translate-y-[150%] top-1/2 left-5"
            >
                <IoTriangle className="opacity-60" color="white" size={50} />
            </div>
            <div
                onClick={() => {
                    socket.emit("controller_up_red")
                    dispatch(AppSlice.actions.setRedWin(state.redWin + 1))
                }}
                className="text-white absolute translate-y-1/2 top-1/2 left-5"
            >
                <IoTriangle
                    className="rotate-180 opacity-60"
                    color="white"
                    size={50}
                />
            </div>
            <div className="text-white absolute -translate-y-[150%] top-1/2 right-5">
                <p className="opacity-70 text-7xl font-bold">{state.blueWin}</p>
            </div>
            <div className="text-white absolute translate-y-1/2 top-1/2 right-5">
                <p className="opacity-70 text-7xl font-bold">{state.redWin}</p>
            </div>
            <div className="h-[50vh] bg-blue-zone grid place-items-center px-10">
                <GridAction team="blue" className="mt-10" />
            </div>
            <div className="h-[50vh] bg-red-zone ">
                <GridAction team="red" className="pt-[30%] md:pt-[10%]" />
            </div>
        </div>
    )
}

function Button({
    children,
    className,
    ...props
}: React.PropsWithChildren & React.HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={twMerge(
                "active:scale-110 transition-all cursor-pointer duration-300 ease-in rounded-lg w-[70px] h-[70px] bg-white/30 backdrop-blur-sm grid place-items-center",
                className,
            )}
        >
            <p className="text-2xl">{children}</p>
        </div>
    )
}

function GridAction({
    className,
    team,
    ...props
}: React.HTMLProps<HTMLDivElement> & { team: "red" | "blue" }) {
    const changePoint = React.useCallback((num: number) => {
        socket.emit(`controller_inc_point_${team}`, num)
    }, [])

    const customAction = React.useCallback((num: string) => {
        socket.emit(`controller_action_${team}`, num)
    }, [])

    return (
        <div
            {...props}
            className={twMerge(
                "grid grid-cols-3 gap-y-10 grid-rows-3 w-[90%] justify-items-center",
                className,
            )}
        >
            <Button onClick={() => changePoint(1)}>+1</Button>
            <Button onClick={() => changePoint(2)}>+2</Button>
            <Button onClick={() => changePoint(3)}>+3</Button>
            <Button onClick={() => changePoint(-1)}>-1</Button>
            <Button onClick={() => customAction("+1L")} className="bg-red-600">
                +1L
            </Button>
            <Button
                onClick={() => customAction("-1L")}
                className="bg-green-500"
            >
                -1L
            </Button>
        </div>
    )
}
