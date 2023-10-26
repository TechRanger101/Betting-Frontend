interface ImportMetaEnv {
  readonly VITE_FARE_TOKEN_ADDRESS: string
  readonly VITE_FARE_SPIN_ADDRESS: string
  readonly VITE_WS_URL: string
  readonly VITE_INFURA_API_KEY: string
  readonly VITE_TEST_CHAIN_ID: string
  readonly MODE: string
  readonly VITE_HTTP_URL: string
  readonly VITE_NETWORK_TYPE: string
  readonly VITE_FARE_RPC_URL: string
  readonly VITE_FARE_RPC_URL_WS: string
  readonly VITE_VERCEL_ENVIRONMENT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.splinecode' {
  const value: string
  export default value
}
