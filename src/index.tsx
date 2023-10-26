import React from 'react'
import { createRoot } from 'react-dom/client'
import { enableMapSet } from 'immer'

// import { Web3ReactProvider } from '@web3-react/core'
// import AccessKeyPage from './pages/AccessKeyPage'
import { GlobalStyle } from './style'
// import { connectors } from './lib/crypto/connectors'
import App from './App'
// import { AccessBackground } from './pages/AccessKeyPage/Background'

enableMapSet()

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
    {/* <AccessBackground /> */}

    {/* <Web3ReactProvider connectors={connectors}> */}
    {/*   <AccessKeyPage /> */}
    {/* </Web3ReactProvider> */}
  </React.StrictMode>
)
