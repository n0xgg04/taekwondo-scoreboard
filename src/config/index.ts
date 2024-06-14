import { io } from "socket.io-client"

const ENV = import.meta.env

const APP_CONFIG = {
    WS_URL: "http://localhost:3000",
}

export const socket = io(APP_CONFIG.WS_URL, {
    autoConnect: true,
})

export default APP_CONFIG
