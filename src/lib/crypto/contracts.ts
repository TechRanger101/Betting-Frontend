import { utils } from 'ethers'
import type { Web3Provider } from '@ethersproject/providers'

import type { FareToken } from './typechain'
import { FareSpin__factory, FareToken__factory } from './typechain'

const { VITE_FARE_TOKEN_ADDRESS, VITE_FARE_SPIN_ADDRESS } = import.meta.env

export const fareTokenAddress =
  VITE_FARE_TOKEN_ADDRESS || '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
export const fareSpinAddress =
  VITE_FARE_SPIN_ADDRESS || '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'

console.log(VITE_FARE_SPIN_ADDRESS, VITE_FARE_TOKEN_ADDRESS)

export const decimals = 18

export function getFareTokenContract(provider?: Web3Provider) {
  if (!provider) return
  return FareToken__factory.connect(fareTokenAddress, provider.getSigner())
}

export function getFareSpinContract(provider?: Web3Provider) {
  if (!provider) return
  return FareSpin__factory.connect(fareSpinAddress, provider.getSigner())
}

export async function getFareBalance(addr: string, fareTokenContract?: FareToken) {
  if (!fareTokenContract) return
  const bnFareBalance = await fareTokenContract?.balanceOf(addr)
  return utils.formatUnits(bnFareBalance, decimals)
}
