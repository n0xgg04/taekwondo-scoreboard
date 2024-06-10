import * as React from "react"

export default function ScoreboardLayout({
    children,
}: React.PropsWithChildren) {
    return (
        <div className="w-full overflow-hidden h-full grid grid-cols-1 grid-rows-12">
            {children}
        </div>
    )
}
