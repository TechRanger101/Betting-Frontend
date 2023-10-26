import create from 'zustand'
import { type FareSpin, type FareToken } from '@/lib/crypto/typechain'

export type CryptoState = {
  ethBalance: string
  fareBalance: string
  fareSpinContract?: FareSpin
  fareTokenContract?: FareToken
}

export type CryptoStoreActions = {
  setEthBalance: (eth: string) => void
  setFareBalance: (fare: string) => void
  setFareSpinContract: (spin?: FareSpin) => void
  setFareTokenContract: (fare?: FareToken) => void
}

export const initialCryptoState: CryptoState = {
  ethBalance: '0',
  fareBalance: '0',
}

const useCryptoStore = create<CryptoState & CryptoStoreActions>(set => ({
  ...initialCryptoState,
  setEthBalance: ethBalance => set({ ethBalance }),
  setFareBalance: fareBalance =>
    set(() => ({
      fareBalance: Math.floor(Number(fareBalance)).toString(),
    })),
  setFareSpinContract: fareSpinContract => set({ fareSpinContract }),
  setFareTokenContract: fareTokenContract => set({ fareTokenContract }),
}))

export default useCryptoStore
