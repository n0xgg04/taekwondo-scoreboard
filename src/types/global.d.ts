declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string
            WS_URL: string
        }
    }
}

export {}
