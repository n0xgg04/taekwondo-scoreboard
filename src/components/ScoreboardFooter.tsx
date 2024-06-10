import * as React from "react"
import { twMerge } from "tailwind-merge"

type Props = {}
export default function ScoreboardFooter({
    children,
    className,
    ...props
}: React.PropsWithChildren & React.HTMLProps<HTMLDivElement>) {
    return (
        <div className={twMerge("w-full bg-gray-200")} {...props}>
            {children}
        </div>
    )
}
