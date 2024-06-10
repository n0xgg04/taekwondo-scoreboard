import * as React from "react"
import { useAppSelector } from "@/hooks/useAppSelector.tsx"
import useWindowSize from "@/hooks/useWindowSize.tsx"
import Counter from "@/components/Counter.tsx"

type Props = {}
export default function RoundInfo(props: Props) {
    const state = useAppSelector((state) => state.app)
    const { height } = useWindowSize()
    const [timeLeft, setTimeLeft] = React.useState(state.counter)

    return (
        <div
            style={{
                height: `${height - state.offsetTop}px`,
                marginTop: `${state.offsetTop}px`,
            }}
            className="text-white absolute z-10 w-[500px] -translate-x-1/2 left-1/2 bg-black flex flex-col items-center "
        >
            <div className="p-2">
                <p className="text-[3rem] uppercase leading-10 mt-2">Match</p>
                <p className="text-[5rem] leading-tight font-bold">001</p>
            </div>
            <Counter />
            <div className="flex flex-col justify-end items-center mt-2">
                <p className="uppercase text-[3rem]">Round</p>
                <p className="text-[7rem]">1</p>
            </div>
        </div>
    )
}
