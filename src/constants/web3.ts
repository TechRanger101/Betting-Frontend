import { type Overrides } from 'ethers'
import { rpcUrl } from './rpc'

export const isTestnet = import.meta.env.VITE_NETWORK_TYPE === 'testnet'
export const blockchainChainId = Number(import.meta.env.VITE_TEST_CHAIN_ID) || 51337

export enum ConnectionType {
  INJECTED = 'INJECTED',
  COINBASE_WALLET = 'COINBASE_WALLET',
  WALLET_CONNECT = 'WALLET_CONNECT',
  NETWORK = 'NETWORK',
}

export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,

  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,
  ARBITRUM_GOERLI = 421613,

  OPTIMISM = 10,
  OPTIMISM_GOERLI = 420,

  POLYGON = 137,
  POLYGON_MUMBAI = 80001,

  AVALANCHE = 43114,
  AVALANCHE_FUJI = 43113,

  LOCAL_HARDHAT = 31337,
  TEST_CHAIN = 51338,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.MAINNET]: 'mainnet',
  [SupportedChainId.ROPSTEN]: 'ropsten',
  [SupportedChainId.RINKEBY]: 'rinkeby',
  [SupportedChainId.GOERLI]: 'goerli',
  [SupportedChainId.POLYGON]: 'polygon',
  [SupportedChainId.POLYGON_MUMBAI]: 'polygon_mumbai',
  [SupportedChainId.AVALANCHE]: 'avalanche',
  [SupportedChainId.AVALANCHE_FUJI]: 'avalanche_fuji',
  [SupportedChainId.ARBITRUM_ONE]: 'arbitrum',
  [SupportedChainId.ARBITRUM_RINKEBY]: 'arbitrum_rinkeby',
  [SupportedChainId.OPTIMISM]: 'optimism',
  [SupportedChainId.OPTIMISM_GOERLI]: 'optimism_goerli',
  [SupportedChainId.LOCAL_HARDHAT]: 'local_hardhat',
}

export const INFURA_API_KEY =
  import.meta.env.VITE_INFURA_API_KEY || '31aadaed31984e0e865701e3c96cb93b'

// TODO: Added testnet chain urls and infura/alchemy api key
export const CHAIN_URLS = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
  [SupportedChainId.AVALANCHE]: `https://avalanche-mainnet.infura.io/v3/${INFURA_API_KEY}`,
  [SupportedChainId.AVALANCHE_FUJI]: `https://avalanche-fuji.infura.io/v3/${INFURA_API_KEY}`,
  [SupportedChainId.LOCAL_HARDHAT]: 'http://localhost:8545',
  [SupportedChainId.TEST_CHAIN]: rpcUrl || 'https://testnet.fareprotocol.io',
  // [SupportedChainId.ARBITRUM_GOERLI]: 'https://endpoints.omniatech.io/v1/arbitrum/goerli/public',
  [SupportedChainId.ARBITRUM_GOERLI]:
    rpcUrl || 'https://arb-goerli.g.alchemy.com/v2/1dZW0pYGfpountCh3Zs8rj4AMpWKnT9x',
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  id => typeof id === 'number'
) as SupportedChainId[]

export function isSupportedChain(chainId: number | null | undefined): chainId is SupportedChainId {
  return !!chainId && !!SupportedChainId[chainId]
}

export const baseTxOverrides: Overrides = isTestnet
  ? {}
  : ({
      gasLimit: 2100000,
      gasPrice: 8000000000,
    } as const)
