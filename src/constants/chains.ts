import type { AddEthereumChainParameter } from '@web3-react/types'
import { CHAIN_URLS, SupportedChainId } from './web3'

// TODO: Need to get urls for other supported chains

export const ethChain: AddEthereumChainParameter = {
  chainId: 1,
  chainName: 'Ethereum Mainnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [CHAIN_URLS[SupportedChainId.MAINNET]],
  blockExplorerUrls: ['https://etherscan.io'],
  iconUrls: [],
}

export const fujiChain: AddEthereumChainParameter = {
  chainId: 43113,
  chainName: 'Avalanche Fuji Testnet',
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: [CHAIN_URLS[SupportedChainId.AVALANCHE_FUJI]],
  blockExplorerUrls: ['https://testnet.snowtrace.io'],
  iconUrls: [],
}

export const avaxChain: AddEthereumChainParameter = {
  chainId: 43114,
  chainName: 'Avalanche C - Chain',
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: [CHAIN_URLS[SupportedChainId.MAINNET]],
  blockExplorerUrls: ['https://snowtrace.io'],
  iconUrls: [],
}

export const hardhatChain: AddEthereumChainParameter = {
  chainId: Number(31337),
  chainName: 'Hardhat Local',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [CHAIN_URLS[SupportedChainId.LOCAL_HARDHAT]],
  blockExplorerUrls: [],
  iconUrls: [],
}

export const testChainParams: AddEthereumChainParameter = {
  chainId: Number(import.meta.env.VITE_TEST_CHAIN_ID || 51337),
  chainName: 'Fare Protocol Testnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [CHAIN_URLS[SupportedChainId.TEST_CHAIN]],
  blockExplorerUrls: undefined,
  iconUrls: undefined,
}
// https://endpoints.omniatech.io/v1/arbitrum/goerli/public
export const arbitrumGoerliChainParams: AddEthereumChainParameter = {
  // chainId: Number(import.meta.env.VITE_TEST_CHAIN_ID || 421613),
  chainId: 421613,
  chainName: 'Arbitrum Goerli',
  nativeCurrency: {
    name: 'AGOR',
    symbol: 'AGOR',
    decimals: 18,
  },
  // rpcUrls: [CHAIN_URLS[SupportedChainId.TEST_CHAIN]],
  rpcUrls: [CHAIN_URLS[SupportedChainId.ARBITRUM_GOERLI]],
  blockExplorerUrls: ['https://goerli-rollup-explorer.arbitrum.io'],
  iconUrls: undefined,
}

export const chains = {
  mainnet: ethChain,
  avax: avaxChain,
  fuji: fujiChain,
  hardhat: hardhatChain,
  testChain: testChainParams,
}
