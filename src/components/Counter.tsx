import * as React from "react"
import { useAppSelector } from "@/hooks/useAppSelector.tsx"
import useWindowSize from "@/hooks/useWindowSize.tsx"
import { parseToMin } from "@/utils/time-parser.ts"

type Props = {}

export default function Counter() {
    const state = useAppSelector((state) => state.app)
    const [timeLeft, setTimeLeft] = React.useState(state.counter)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft > 0) {
                    return prevTimeLeft - 1
                } else {
                    clearInterval(timer)
                    return 0
                }
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="w-full h-[35%] bg-round grid place-items-center">
            <p className="text-[8rem] text-black font-bold">
                {parseToMin(timeLeft)}
            </p>
        </div>
    )
}
