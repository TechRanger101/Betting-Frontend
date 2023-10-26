import { type GameModeNumber } from '@/components/Wheel/types'
import { type IGameMessage } from '@/lib/ws/types/chatRoom'
import type * as spinTypes from '../../lib/ws/types/spinRoom'
import type { SpinClaimable } from '@/lib/http/spin'
import type SpinRoom from '@/lib/ws/rooms/SpinRoom'

export type SpinState = {
  isConnected: boolean
  users: Map<string, spinTypes.IUser>
  guestUsers: Map<string, spinTypes.IGuestUser>
  roomStatus: spinTypes.SpinRoomStatus
  fareTotalSupply: string
  currentRoundId: number
  countdown: number
  round: Partial<spinTypes.IRound>
  prevRounds: Map<string, spinTypes.IRound>
  isRoundPaused: boolean
  batchEntries: Map<string, spinTypes.IBatchEntry>
  myBalance: spinTypes.IBalance
  countdownTotal: number
  spinTick: number
  entryQueue: EntryQueueItem[]
  mySubmittedEntries?: spinTypes.IBatchEntry
  prevSubmittedEntries?: spinTypes.IBatchEntry
  claimableRewards: SpinClaimable[]
  spinRoomWS?: SpinRoom
  spinRoomErrMsg: string
  hasApprovedMintBurn: boolean
  chatMessages: IGameMessage[]
}

export type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

export type EntryQueueItem = {
  entryId: string
  amount: number
  contractModeId: GameModeNumber
  pickedNumber: number
}
