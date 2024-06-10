import * as React from "react"
import { createBrowserRouter } from "react-router-dom"
import { Homepage, NotFound, ScoreboardPage } from "@/pages"
import { RouterProvider } from "react-router"
import { store } from "./stores"
import { Provider } from "react-redux"

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
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )
}
