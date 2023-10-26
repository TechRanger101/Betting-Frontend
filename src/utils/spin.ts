import type { GameModeNumber } from '@/components/Wheel/types'
import { TOTAL_COUNTDOWN_SECS } from '@/constants/wheel'
import { WHEEL_COLORS } from '@/design/colors'

export const generateColorList = (gameMode: GameModeNumber) => {
  return Array(100)
    .fill(0)
    .map((_value, idx) => WHEEL_COLORS[gameMode][idx % gameMode])
}

export const getCountdownPercent = (secs: number, totalSecs = TOTAL_COUNTDOWN_SECS) => {
  return secs / totalSecs
}

export const getWheelColor = (contractModeId: GameModeNumber, pickedNumber: number) => {
  return WHEEL_COLORS[contractModeId][pickedNumber % contractModeId]
}

export const GameModeLimitMap = {
  2: 1,
  10: 4,
  100: 9,
}

export const gameModeMap = (gmId: GameModeNumber): 0 | 1 | 2 => {
  if (gmId === 2) {
    return 0
  } else if (gmId === 10) {
    return 1
  } else {
    return 2
  }
}

export const inverseGameModeMap = (gmId: number) => {
  if (gmId === 0) {
    return 2
  } else if (gmId === 1) {
    return 10
  } else {
    return 100
  }
}
