import * as React from "react"
import { useState } from "react"

export default function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 })
    const getSize = () => {
        const height = window.innerHeight
        const width = window.innerWidth
        setSize({ width, height })
    }

    React.useEffect(() => {
        if (!window) return
        window.addEventListener("resize", getSize)
        getSize()

        return () => {
            window.removeEventListener("resize", getSize)
        }
    }, [])

    return size
}
