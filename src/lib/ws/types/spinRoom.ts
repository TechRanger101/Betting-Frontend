import type { Schema, ArraySchema, MapSchema } from '@colyseus/schema'

export type SpinRoomStatus =
  | 'starting'
  | 'waiting-for-first-entry'
  | 'countdown'
  | 'pausing'
  | 'spinning'
  | 'finished'

export interface ISpinRoomOptions {
  guestUsername?: string
  authToken?: string
}

export interface IUser extends Schema {
  publicAddress: string // Unique identifier for players
  username?: string // Optional username set by player
  colorTheme?: string // @NOTE: Create colorTheme enum - Optional color theme set by players
  sessionId?: string
  balance?: IBalance
  fareBalance?: string
  ethBalance?: string
  isInRound?: boolean
}

export interface IGuestUser extends Schema {
  guestId: string // Unique identifier for players
  sessionId?: string
}

export interface IEntry {
  amount: string // Amount of FARE token submitted
  roundId: number // Round when this entry was submitted
  contractModeId: number // References the ContractMode mapping in the smart contract (0 = 2X, 1 = 10X, 2 = 100X)
  pickedNumber: number // Number picked for the specific contractMode
  player: string // Players public address
  entryIdx: number // References position in entry array in smart contract
  mintAmount?: string // Amount won when round is over
  settled: boolean // Determines if a player has submitted an batchEntrySettled transaction to claim token
  isBurn: boolean
}

export interface IBalance {
  eth: string // @NOTE: may need to rename this to ethBalance when we deploy to production
  fare: string // Amount of fareToken
}

export interface IBatchEntry extends Schema {
  roundId: number // Round when batchEntry was submitted
  batchEntryId: number // References the position of batchEntry array in smart contract
  player: string // Public address of player
  username?: string // Username of player
  settled: boolean // Determines if a player has submitted an batchEntrySettled transaction to claim token
  placedAt: number
  placedTxHash: string
  totalEntryAmount: string // Amount(sum of all entries) won when round is over
  totalMintAmount?: string // Amount(sum of all minting entries) won when round is over
  timestamp: number
  entries: ArraySchema<IEntry>
  isBurn: boolean // Defaults to false
}

export interface IRound extends Schema {
  roundId: number
  randomNum: number
  // @NOTE: Need to parse out minting numbers for 2x, 10x, 100x
  // twoXNum: (0 - 1)
  // tenXNum: (0 - 9)
  // hundoNum: (0 - 99)
  randomEliminator: string
  revealKey: string
  randomHash: string
  startedAt: number
  endedAt: number
  fullRandomNum: string
  isTwoXElim: boolean
  isTenXElim: boolean
  isHundoXElim: boolean
}

export interface ISpinRoom extends Schema {
  guestUsers: MapSchema<IGuestUser>
  users: MapSchema<IUser>
  batchEntries: MapSchema<IBatchEntry>
  round: MapSchema<IRound>
  roomStatus: SpinRoomStatus
  fareTotalSupply: string
  currentRoundId: number
  isRoundPaused: boolean
  countdownTotal: number
  spinTick: number
}
