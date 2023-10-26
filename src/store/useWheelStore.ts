import create from 'zustand'
import type { TickPathAnimProps, GameModeNumber } from '@/components/Wheel/types'

export type WheelState = {
  tickHovered: TickPathAnimProps | null
  tickSelected: TickPathAnimProps | null
  wheelLoaded: boolean
  selectedGameMode: GameModeNumber
  spinTickId: number
  spinTickSpeed: number
  isWheelSpinning: boolean
  countdown: number
  countdownTotal: number
  selectBetAmount: number
}

export type WheelActions = {
  setTickHovered: (tickHovered: TickPathAnimProps | null) => void
  setTickSelected: (tickHovered: TickPathAnimProps | null) => void
  setWheelLoaded: (isLoaded: boolean) => void
  setSelectedGameMode: (gameMode: GameModeNumber) => void
  setSelectBetAmount: (selectBetAmount: number) => void
}

export const initialWheelStore: WheelState = {
  tickHovered: null,
  tickSelected: null,
  wheelLoaded: false,
  selectedGameMode: 2,
  spinTickId: 0,
  isWheelSpinning: false,
  spinTickSpeed: 45,
  countdown: 0,
  countdownTotal: 50_000,
  selectBetAmount: 0,
}

export type WheelStore = WheelState & WheelActions

// TODO: We can remove methods here and just use `useWheelStore.setState({...})`
const useWheelStore = create<WheelStore>(set => ({
  ...initialWheelStore,
  setSelectBetAmount: selectBetAmount =>
    set(() => ({
      selectBetAmount,
    })),
  setTickHovered: tickHovered =>
    set(() => ({
      tickHovered,
    })),
  setTickSelected: tickSelected =>
    set(() => ({
      tickSelected,
    })),
  setWheelLoaded: wheelLoaded =>
    set(() => ({
      wheelLoaded,
    })),
  setSelectedGameMode: selectedGameMode =>
    set(() => ({
      selectedGameMode,
    })),
}))

export default useWheelStore
