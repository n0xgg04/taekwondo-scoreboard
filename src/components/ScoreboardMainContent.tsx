import * as React from "react"
import { twMerge } from "tailwind-merge"

export default function ScoreboardMainContent({
    children,
    className,
    ...props
}: React.PropsWithChildren & React.HTMLProps<HTMLDivElement>) {
    return (
        <div className={twMerge("row-span-11", className)} {...props}>
            {children}
        </div>
    )
}
