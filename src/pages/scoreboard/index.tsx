import * as React from "react"
import Scoreboard from "@/components/Scoreboard.tsx"
import Header from "@/components/Header.tsx"
import MainSection from "@/components/MainSection.tsx"
import RoundInfo from "@/components/RoundInfo.tsx"

export default function ScoreboardPage() {
    return (
        <Scoreboard>
            <Scoreboard.Header className="select-none text-white flex flex-row justify-between px-5 bg-dark">
                <Header battleTitle="Taekwondo cấp thành phố - Hạng cân 60kg" />
            </Scoreboard.Header>
            <Scoreboard.Main className="select-none flex w-full flex-row relative">
                <RoundInfo />
                <MainSection />
            </Scoreboard.Main>
        </Scoreboard>
    )
}
