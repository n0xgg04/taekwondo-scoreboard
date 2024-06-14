import * as React from "react"
import Scoreboard from "@/components/Scoreboard.tsx"
import Header from "@/components/Header.tsx"
import MainSection from "@/components/MainSection.tsx"
import RoundInfo from "@/components/RoundInfo.tsx"
import { Helmet } from "react-helmet"
import useSocket from "@/hooks/useSocket.tsx"
import { useAppSelector } from "@/hooks/useAppSelector.tsx"

export default function ScoreboardPage() {
    useSocket()
    const state = useAppSelector((s) => s.app)

    return (
        <Scoreboard>
            {!state.isRealtime && (
                <div className="fixed inset-0 size-full bg-black grid place-items-center">
                    <p className="text-2xl">Đang kết nối tới máy chủ...</p>
                </div>
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
