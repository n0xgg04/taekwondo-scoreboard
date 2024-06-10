import { useSelector } from "react-redux"
import { RootState } from "@/stores"

export const useAppSelector = useSelector.withTypes<RootState>()
