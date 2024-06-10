import * as React from "react"
import { twMerge } from "tailwind-merge"
export default function ScoreboardTopHeader({
    children,
    className,
    ...props
}: React.PropsWithChildren & React.HTMLProps<HTMLDivElement>) {
    return (
        <div
            className={twMerge(
                "w-full items-center flex bg-blue-200",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}
