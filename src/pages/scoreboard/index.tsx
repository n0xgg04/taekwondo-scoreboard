import * as React from "react"
import Scoreboard from "@/components/Scoreboard.tsx"
import Header from "@/components/Header.tsx"
import MainSection from "@/components/MainSection.tsx"
import RoundInfo from "@/components/RoundInfo.tsx"
import { Helmet } from "react-helmet"
import useSocket from "@/hooks/useSocket.tsx"
import { useAppSelector } from "@/hooks/useAppSelector.tsx"
import { socket } from "@/config"
import { useAppDispatch } from "@/hooks/useAppDispatch.tsx"
import { AppSlice } from "@/stores/slices/app.slice.ts"

export default function ScoreboardPage() {
    useSocket()
    const state = useAppSelector((s) => s.app)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        socket.on("set_status", (status: string) => {
            dispatch(AppSlice.actions.setStatus(status as any))
        })
    }, [])

    React.useEffect(() => {
        dispatch(AppSlice.actions.setStatus("not-start-yet"))
    }, [])

    React.useEffect(() => {
        socket.on("set_info", (data) => {
            console.log(data)
            dispatch(AppSlice.actions.setBlueCity(data["blue_name"]))
            dispatch(AppSlice.actions.setRedCity(data["red_name"]))
            dispatch(AppSlice.actions.setDefaultCounter(data["battle_time"]))
            dispatch(AppSlice.actions.setMatch(data["match"]))
            dispatch(AppSlice.actions.setRound(data["round"]))
        })
    }, [
        state.blueCity,
        state.redCity,
        state.defaultCounter,
        state.match,
        state.round,
    ])

    return (
        <Scoreboard>
            {!state.isRealtime && (
                <div className="fixed inset-0 size-full bg-black grid place-items-center">
                    <p className="text-2xl">Đang kết nối tới máy chủ...</p>
                </div>
            )}
            {state.status === "not-start-yet" ? (
                <div className="fixed inset-0 z-[999] size-full bg-black grid place-items-center">
                    <p className="text-2xl text-white">
                        Trận đấu chưa sẵn sàng...
                    </p>
                </div>
            ) : (
                ""
            )}
            <Helmet>
                <title>Taekwondo</title>
                <meta name="description" content="Taekwondo" />
            </Helmet>
            <Scoreboard.Header className="select-none text-white flex flex-row justify-between px-5 bg-dark">
                <Header battleTitle={state.contestName} />
            </Scoreboard.Header>
            <Scoreboard.Main className="select-none flex w-full flex-row relative">
                <RoundInfo />
                <MainSection />
            </Scoreboard.Main>
        </Scoreboard>
    )
}
