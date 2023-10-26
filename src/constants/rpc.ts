import { Web3Provider } from '@ethersproject/providers'
import type { AbstractConnector } from '@web3-react/abstract-connector'
import {
  injectedConnector,
  getWalletConnectConnector,
  walletlinkConnector,
} from '../utils/connectors'

// export const rpcUrl = String(import.meta.env.VITE_FARE_RPC_URL) || 'https://testnet.fareprotocol.io'
export const rpcUrl =
  String(import.meta.env.VITE_FARE_RPC_URL_WS) || 'https://testnet.fareprotocol.io'

export const AUTH_SIGNING_MSG =
  'Fareplay.io would like to authenticate your account.\nPlease sign the following: '

export enum WalletEnum {
  METAMASK = 1,
  WALLETCONNECT = 2,
  WALLETLINK = 3,
}

export enum ChainIdEnum {
  NONE = 0,
  ETHEREUM_MAINNET = 1,
  AVALANCHE_TESTNET = 43113,
  AVALANCHE_MAINNET = 43114,
}

export const SUPPORTED_WALLETS: number[] = Object.values(WalletEnum).filter(
  v => !isNaN(Number(v))
) as number[]

export const evmConnectors: Record<WalletEnum, () => AbstractConnector> = {
  [WalletEnum.METAMASK]: () => injectedConnector,
  [WalletEnum.WALLETCONNECT]: getWalletConnectConnector,
  [WalletEnum.WALLETLINK]: () => walletlinkConnector,
}

export const WALLET_TITLES = {
  [WalletEnum.METAMASK]: 'Metamask',
  [WalletEnum.WALLETCONNECT]: 'Wallet Connect',
  [WalletEnum.WALLETLINK]: 'Wallet Link',
}

export enum ChainCodeErrorEnum {
  UNAVAILABLE = 4902, // chain has not been added to MetaMask
  CANCELLED = 4001, // switching chain has been cancelled
}

export const getLibrary = (provider: ExternalProvider): Web3Provider => {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}
