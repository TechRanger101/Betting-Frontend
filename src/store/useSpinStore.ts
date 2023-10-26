import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import SpinRoom from '@/lib/ws/rooms/SpinRoom'
import { type IGameMessage } from '@/lib/ws/types/chatRoom'
import type { IRound, IBatchEntry, IGuestUser, IUser, IBalance } from '@/lib/ws/types/spinRoom'
import type { SpinClaimable } from '@/lib/http/spin'
import { MAX_CHAT_MSGS } from '@/constants/ws'
import createSelectors from './helpers'
import type { SpinState, EntryQueueItem } from './types'

export type SpinStateActions = {
  setRound: (round: Partial<IRound>) => void
  setPrevRound: (roundId: string, round: Partial<IRound>) => void
  setPrevSubmittedEntries: (batchEntry: IBatchEntry) => void
  clearPrevRound: (roundId: string) => void
  setBatchEntries: (batchEntries: IBatchEntry | IBatchEntry[]) => void
  removeBatchEntry: (pubKey: string) => void
  clearBatchEntries: () => void
  setGuestUser: (sessionId: string, guestUser: IGuestUser) => void
  removeGuestUser: (sessionId: string) => void
  setUser: (sessionId: string, user: IUser) => void
  removeUser: (sessionId: string) => void
  setMyBalance: (myBalance: IBalance) => void
  clearEntryQueue: () => void
  removeEntryQueueItem: (entryQueueId: string) => void
  addEntryQueueItem: (entryQueueItem: EntryQueueItem) => void
  setMySubmittedEntries: (batchEntry: IBatchEntry) => void
  clearMySubmittedEntries: () => void
  setClaimableRewards: (claimables: SpinClaimable[]) => void
  addClaimableRewards: (claimable: SpinClaimable) => void
  setSpinRoomWS: (spinRoomWS?: SpinRoom) => void
  setSpinRoomErrMsg: (spinRoomErrMsg: string) => void
  clearClaimableRewards: () => void
  setHasApprovedMintBurn: (hasApprovedMintBurn: boolean) => void
  addChatMsg: (msg: IGameMessage) => void
  addChatMsgs: (msgs: IGameMessage[]) => void
  updateChatMsgsUsername: (publicAddress: string, username: string) => void
  removeTimeoutChatMsg: (myPublicAddress: string) => void
}

export const initialSpinState: SpinState = {
  isConnected: false,
  claimableRewards: [],
  prevRounds: new Map(),
  prevSubmittedEntries: undefined,
  users: new Map(),
  guestUsers: new Map(),
  batchEntries: new Map(),
  round: {},
  mySubmittedEntries: undefined,
  myBalance: { eth: '---', fare: '---' },
  fareTotalSupply: '',
  isRoundPaused: false,
  countdown: 0,
  currentRoundId: 0,
  roomStatus: 'waiting-for-first-entry',
  countdownTotal: 50_000,
  spinTick: 0,
  entryQueue: [],
  spinRoomWS: new SpinRoom(),
  spinRoomErrMsg: '',
  hasApprovedMintBurn: false,
  chatMessages: [],
}

export type SpinStore = SpinState & SpinStateActions

const useSpinStore = create<
  SpinStore,
  [['zustand/devtools', SpinStore], ['zustand/immer', SpinStore]]
>(
  devtools(
    immer(set => ({
      ...initialSpinState,
      removeTimeoutChatMsg: myPublicAddress =>
        set(state => {
          const idx = state.chatMessages
            .slice()
            .reverse()
            .findIndex(msg => msg.createdBy === myPublicAddress)

          if (idx !== -1) {
            const indexToRemove = state.chatMessages.length - 1 - idx
            state.chatMessages.splice(indexToRemove, 1)
          }
        }),
      updateChatMsgsUsername: (publicAddress, username) =>
        set(state => {
          // const newChatMsgs: IGameMessage[] = []

          for (const msg of state.chatMessages) {
            if (msg.createdBy === publicAddress) {
              msg.username = username
            }
            // newChatMsgs.push(msg)
          }

          // state.chatMessages = newChatMsgs
        }),
      addChatMsgs: msgs =>
        set(state => {
          state.chatMessages.push(...msgs)
        }),
      addChatMsg: msg =>
        set(state => {
          state.chatMessages.push(msg)

          if (state.chatMessages.length > MAX_CHAT_MSGS) {
            state.chatMessages.shift()
          }
        }),
      setHasApprovedMintBurn: hasApprovedMintBurn =>
        set(() => ({
          hasApprovedMintBurn,
        })),
      setSpinRoomErrMsg: spinRoomErrMsg =>
        set(() => ({
          spinRoomErrMsg,
        })),
      setSpinRoomWS: spinRoomWS =>
        set(() => ({
          spinRoomWS,
        })),
      setClaimableRewards: claimables =>
        set(state => {
          const uniqueRoundIds: Set<number> = new Set()
          state.claimableRewards = claimables.filter(({ roundId }) => {
            if (uniqueRoundIds.has(roundId)) {
              return false
            } else {
              uniqueRoundIds.add(roundId)
              return true
            }
          })
        }),
      clearClaimableRewards: () => set(() => ({ claimableRewards: [] })),
      addClaimableRewards: claimable =>
        set(state => {
          // Ensure duplicates can't be added to claims
          const isDuplicate = state.claimableRewards.some(val => val.roundId === claimable.roundId)
          if (!isDuplicate) {
            state.claimableRewards.push(claimable)
          }
        }),
      clearEntryQueue: () =>
        set(state => {
          state.entryQueue = []
        }),
      addEntryQueueItem: entryQueueItem =>
        set(state => {
          state.entryQueue.unshift(entryQueueItem)
        }),
      removeEntryQueueItem: entryId =>
        set(state => {
          state.entryQueue = state.entryQueue.filter(entry => entry.entryId !== entryId)
        }),
      setBatchEntries: batchEntries =>
        set(state => {
          if (Array.isArray(batchEntries)) {
            batchEntries.forEach(batchEntry =>
              state.batchEntries.set(batchEntry.player, batchEntry)
            )
          } else {
            state.batchEntries.set(batchEntries.player, batchEntries)
          }
        }),
      setMySubmittedEntries: batchEntries =>
        set(state => {
          try {
            state.mySubmittedEntries = batchEntries.toJSON() as IBatchEntry
            state.prevSubmittedEntries = undefined
          } catch {
            state.mySubmittedEntries = batchEntries as IBatchEntry
            state.prevSubmittedEntries = undefined
          }
        }),
      setPrevSubmittedEntries: batchEntries =>
        set(state => {
          try {
            state.prevSubmittedEntries = batchEntries.toJSON() as IBatchEntry
          } catch {
            state.prevSubmittedEntries = batchEntries as IBatchEntry
          }
        }),
      clearMySubmittedEntries: () =>
        set(state => {
          state.mySubmittedEntries = undefined
        }),
      removeBatchEntry: pubKey =>
        set(state => {
          state.batchEntries.delete(pubKey)
        }),
      clearBatchEntries: () =>
        set(state => {
          state.batchEntries.clear()
        }),
      setGuestUser: (sessionId, guestUser) =>
        set(state => {
          state.guestUsers.set(sessionId, guestUser)
        }),
      removeGuestUser: sessionId =>
        set(state => {
          state.guestUsers.delete(sessionId)
        }),
      setUser: (sessionId, user) =>
        set(state => {
          state.users.set(sessionId, user)
        }),
      removeUser: sessionId =>
        set(state => {
          state.users.delete(sessionId)
        }),
      setMyBalance: balance =>
        set(state => {
          state.myBalance = balance
        }),
      setRound: round =>
        set(state => ({
          round: {
            ...state.round,
            ...round,
          },
        })),
      setPrevRound: (roundId, round) =>
        set(state => {
          state.prevRounds.set(roundId, round as any)
        }),
      clearPrevRound: roundId =>
        set(state => {
          state.prevRounds.delete(roundId)
        }),
    }))
  )
)

export const spinStoreSelectors = createSelectors(useSpinStore)

export default useSpinStore
