import * as React from "react"
import { createBrowserRouter } from "react-router-dom"
import { ControllerPage, Homepage, NotFound, ScoreboardPage } from "@/pages"
import { RouterProvider } from "react-router"
import { store } from "./stores"
import { Provider } from "react-redux"
import { Suspense } from "react"
import Loading from "@/components/Loading.tsx"
import { MantineProvider } from "@mantine/core"

const router = createBrowserRouter([
    {
        path: "/",
        element: <ScoreboardPage />,
    },
    {
        path: "/dieukhien",
        element: <ControllerPage />,
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
                <MantineProvider>
                    <RouterProvider router={router} />
                </MantineProvider>
            </Provider>
        </Suspense>
    )
}
