import * as React from "react"

type Props = {}
export default function Loading(props: Props) {
    return (
        <div className="fixed grid place-items-center bg-red-start inset-0 w-scren h-screen">
            <p className="text-[12rem]">LOADING...</p>
        </div>
    )
}
