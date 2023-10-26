import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import {
  AVALANCHE_MAINNET_PARAMS,
  AVALANCHE_TESTNET_PARAMS,
  ETHEREUM_MAINNET_PARAMS,
} from './params'

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    ETHEREUM_MAINNET_PARAMS.chainId,
    AVALANCHE_MAINNET_PARAMS.chainId,
    AVALANCHE_TESTNET_PARAMS.chainId,
  ],
})

export const getWalletConnectConnector = () =>
  new WalletConnectConnector({
    supportedChainIds: [
      ETHEREUM_MAINNET_PARAMS.chainId,
      AVALANCHE_MAINNET_PARAMS.chainId,
      AVALANCHE_TESTNET_PARAMS.chainId,
    ],
    rpc: {
      [ETHEREUM_MAINNET_PARAMS.chainId]: ETHEREUM_MAINNET_PARAMS.rpcUrl,
      [AVALANCHE_MAINNET_PARAMS.chainId]: AVALANCHE_MAINNET_PARAMS.rpcUrl,
      [AVALANCHE_TESTNET_PARAMS.chainId]: AVALANCHE_TESTNET_PARAMS.rpcUrl,
    },
    qrcode: true,
  })

export const walletlinkConnector = new WalletLinkConnector({
  appName: 'Fareplay',
  url: AVALANCHE_MAINNET_PARAMS.rpcUrl,
  supportedChainIds: [AVALANCHE_MAINNET_PARAMS.chainId],
})
