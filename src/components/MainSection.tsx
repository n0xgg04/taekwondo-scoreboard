import * as React from "react"
import ScoreLayout from "@/components/ScoreLayout.tsx"
import VietnamFlag from "@/assets/vn-flag.png"

type Props = {}
export default function MainSection(props: Props) {
    return (
        <>
            <div className="basis-1/2 bg-blue-200 bg-gradient-to-r from-blue-start to-blue-end to-90%">
                <ScoreLayout
                    flag={
                        <img
                            className="box-border border-4 border-solid border-gray-200"
                            alt="flag-1"
                            src={VietnamFlag}
                        />
                    }
                />
            </div>
            <div className="basis-1/2 bg-red-200 from-10% bg-gradient-to-r from-red-end to-red-start">
                <ScoreLayout
                    float="right"
                    flag={
                        <img
                            className="box-border border-4 border-solid border-gray-200"
                            alt="flag-1"
                            src={VietnamFlag}
                        />
                    }
                />
            </div>
        </>
    )
}
