import ScoreboardLayout from "@/components/ScoreboardLayout.tsx"
import ScoreboardFooter from "@/components/ScoreboardFooter.tsx"
import ScoreboardMainContent from "@/components/ScoreboardMainContent.tsx"
import ScoreboardTopHeader from "@/components/ScoreboardTopHeader.tsx"

const Scoreboard = Object.assign(ScoreboardLayout, {
    Header: ScoreboardTopHeader,
    Footer: ScoreboardFooter,
    Main: ScoreboardMainContent,
})

export default Scoreboard
