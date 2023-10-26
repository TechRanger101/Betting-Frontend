import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type GlobalRefState = {
  betAmountInputRef: HTMLInputElement | null
}

export type GlobalRefActions = {
  setBetAmountInputRef: (betAmountInputRef: HTMLInputElement) => void
}

export const initialGlobalRefState: GlobalRefState = {
  betAmountInputRef: null,
}

export type GlobalRefStore = GlobalRefState & GlobalRefActions

const useGlobalRefStore = create<GlobalRefStore, [['zustand/immer', GlobalRefStore]]>(
  immer(set => ({
    ...initialGlobalRefState,
    setBetAmountInputRef: ref =>
      set(() => ({
        betAmountInputRef: ref,
      })),
  }))
)

export default useGlobalRefStore
