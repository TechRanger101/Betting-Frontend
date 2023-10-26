// import { ChainIdEnum } from '../constants/rpc'

export enum ChainIdEnum {
  NONE = 0,
  ETHEREUM_MAINNET = 1,
  AVALANCHE_TESTNET = 43113,
  AVALANCHE_MAINNET = 43114,
}

interface IEVMChainParams {
  chainId: ChainIdEnum
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  }
  rpcUrl: string
  blockExplorerUrls: string
}

export const ETHEREUM_MAINNET_PARAMS: IEVMChainParams = {
  chainId: ChainIdEnum.ETHEREUM_MAINNET,
  chainName: 'Ethereum Mainnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrl: 'https://rpc.ankr.com/eth',
  blockExplorerUrls: 'https://etherscan.io/',
}

export const AVALANCHE_MAINNET_PARAMS: IEVMChainParams = {
  chainId: ChainIdEnum.AVALANCHE_MAINNET,
  chainName: 'Avalanche Mainnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
  blockExplorerUrls: 'https://snowtrace.io/',
}

export const AVALANCHE_TESTNET_PARAMS: IEVMChainParams = {
  chainId: ChainIdEnum.AVALANCHE_TESTNET,
  chainName: 'Avalanche Fuji C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
  blockExplorerUrls: 'https://testnet.snowtrace.io/',
}
