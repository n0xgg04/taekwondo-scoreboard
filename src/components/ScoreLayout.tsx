import * as React from "react"
import { twMerge } from "tailwind-merge"
import { useAppSelector } from "@/hooks/useAppSelector.tsx"
import { useAppDispatch } from "@/hooks/useAppDispatch.tsx"
import { AppSlice } from "@/stores/slices/app.slice.ts"
import useWindowSize from "@/hooks/useWindowSize.tsx"

type Props = {
    flag: React.ReactNode
    float?: "left" | "right"
    scores?: number
    city: string
}

export default function ScoreLayout({
    flag,
    float = "left",
    scores = 0,
    city = "",
}: Props) {
    const scoreBoxRef = React.useRef<HTMLDivElement>(null)
    const state = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch()
    const { width, height } = useWindowSize()

    React.useEffect(() => {
        const offsetTop = scoreBoxRef.current?.offsetTop
        if (state.offsetTop == 0) {
            dispatch(AppSlice.actions.setOffset(offsetTop || 0))
        }
    }, [width, height])

    return (
        <div
            className={twMerge(
                "relative size-full grid grid-rows-5 grid-cols-4 h-full",
            )}
        >
            <div
                style={{
                    height: state.offsetTop,
                    marginLeft: float == "right" ? 250 : undefined,
                    marginRight: float == "left" ? 250 : undefined,
                }}
                className={twMerge(
                    "py-5 px-20 text-white z-10 absolute bottom-0 right-0 left-0 flex flex-row justify-between",
                    float === "right" && "flex-row-reverse",
                )}
            >
                <div className="flex flex-col items-center">
                    <p className="text-[2rem]">Lỗi</p>
                    <p className="font-bold leading-tight text-[5rem]">0</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-[2rem]">Tỉ số</p>
                    <p className="font-bold leading-tight text-[5rem]">0</p>
                </div>
            </div>
            <div
                className={twMerge(
                    "absolute inset-0",
                    float === "left"
                        ? "bg-[radial-gradient(circle_500px_at_center_500px,#C9EBFF,transparent)]"
                        : "bg-[radial-gradient(circle_500px_at_center_500px,#df2729,transparent)]",
                )}
            ></div>
            {float === "left" && (
                <SideSection float={float}>{flag}</SideSection>
            )}
            <div
                className={twMerge(
                    "w-full col-span-3 flex flex-row items-center",
                )}
            >
                <p className="grow text-[4rem] text-center uppercase text-white">
                    {city}
                </p>
            </div>
            <div
                ref={scoreBoxRef}
                className={twMerge(
                    "relative row-span-3 col-span-4",
                    float == "left"
                        ? "row-start-2 col-start-2"
                        : "row-start-2 col-start-1 col-end-4",
                )}
            >
                <div
                    className={twMerge(
                        "text-white size-full absolute inset-0 grid place-items-center",
                        float == "left" ? "bg-blue-zone" : "bg-red-zone" + "",
                    )}
                >
                    <p
                        style={{
                            paddingRight: float == "left" ? 225 : undefined,
                            paddingLeft: float == "right" ? 225 : undefined,
                        }}
                        className="text-[18rem]"
                    >
                        {scores}
                    </p>
                </div>
            </div>
            {float === "right" && (
                <SideSection float={float}>{flag}</SideSection>
            )}
        </div>
    )
}

function SideSection({
    children,
    float,
}: React.PropsWithChildren & { float: Props["float"] }) {
    return (
        <div className="row-span-5 flex flex-col text-white justify-between">
            <div className="grow-0">
                {children}
                <p
                    className={twMerge(
                        "text-[4rem]",
                        float === "left" ? "ml-5" : "pr-5",
                        float === "right" && "text-right",
                    )}
                >
                    VIE
                </p>
            </div>
            <div
                className={twMerge(
                    "text-[4rem] pb-5 flex flex-col items-center",
                    float === "left" ? "ml-5" : "pr-5",
                    float === "right" && "text-right",
                )}
            ></div>
        </div>
    )
}
