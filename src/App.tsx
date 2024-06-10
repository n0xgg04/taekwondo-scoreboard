import * as React from "react"
import { createBrowserRouter } from "react-router-dom"
import { Homepage, NotFound, ScoreboardPage } from "@/pages"
import { RouterProvider } from "react-router"
import { store } from "./stores"
import { Provider } from "react-redux"
import { Suspense } from "react"
import Loading from "@/components/Loading.tsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
    },
    {
        path: "/scoreboard/:id",
        element: <ScoreboardPage />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
])

export default function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </Suspense>
    )
}
