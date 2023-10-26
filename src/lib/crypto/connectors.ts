import { initializeConnector } from '@web3-react/core'
import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { MetaMask } from '@web3-react/metamask'
import { WalletConnect } from '@web3-react/walletconnect'
import type { Web3ReactHooks } from '@web3-react/core'

import { blockchainChainId, CHAIN_URLS } from '../../constants/web3'
export const [metamask, metamaskHooks] = initializeConnector<MetaMask>(
  actions => new MetaMask({ actions, options: { silent: false } })
)

export const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  actions =>
    new WalletConnect({
      actions,
      defaultChainId: blockchainChainId,
      options: {
        rpc: CHAIN_URLS,
        qrcode: true,
      },
      onError: error => console.error(error),
    })
)

export const [coinbaseWallet, coinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
  actions =>
    new CoinbaseWallet({
      actions,
      options: {
        url: CHAIN_URLS[blockchainChainId as keyof typeof CHAIN_URLS],
        appName: 'Fare Protocol Testnet',
      },
      onError: error => console.error(error, 'hey'),
    })
)

export const connectors: [MetaMask | WalletConnect | CoinbaseWallet, Web3ReactHooks][] = [
  [metamask, metamaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
]
