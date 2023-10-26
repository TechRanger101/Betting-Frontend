import { Client } from 'colyseus.js'

import useWheelStore from '@/store/useWheelStore'
import useCryptoStore from '@/store/useCryptoStore'
import { type SpinClaimable } from '@/lib/http/spin'
import { ensureString } from '@/utils/text'
import useGlobalStore, { type GlobalStore } from '@/store/useGlobalStore'
import type { Room } from 'colyseus.js'

import {
  WS_URL,
  ROOM_NAMES,
  ROOM_EVENTS,
  MAX_CHAT_MSG_LENGTH,
  WebSocketCustomCodes,
} from '../../../constants/ws'
import * as types from '../types/spinRoom'
import useSpinStore, { initialSpinState } from '../../../store/useSpinStore'
import { parseChanges } from '../helpers'
import { LOCAL_STORAGE } from '../../../constants/utils'
import { type IGameMessage } from '../types/chatRoom'

class SpinRoom {
  public readonly types = types
  private client: Client
  private room?: Room<types.ISpinRoom>
  private authPublicAddress?: string
  private unsubHeartBeat?: () => void
  private isInBackground = false
  private intervalId?: NodeJS.Timeout
  public sessionId!: string

  constructor() {
    this.client = new Client(WS_URL)
  }

  async join(authToken: string, authPublicAddress?: string, guestUsername?: string) {
    if (this.sessionId) {
      try {
        await this.leave()
      } catch (err) {
        console.warn(err)
      }
    }
    const options: types.ISpinRoomOptions = {
      authToken,
      guestUsername,
    }

    this.room = await this.client.join<types.ISpinRoom>(ROOM_NAMES.Spin, options)
    this.sessionId = this.room.sessionId

    this.authPublicAddress = authPublicAddress

    console.log(`Connected to ${ROOM_NAMES.Spin}`)
    useGlobalStore.setState({ isConnected: true, lostConnection: false })
    this.bindStateEventListeners()
  }

  async leave(hasLostConnection = false) {
    clearInterval(this.intervalId)
    this.unsubHeartBeat?.()
    this.unsubHeartBeat = undefined

    if (!this.room) return
    console.log(`Disconnected from ${ROOM_NAMES.Spin}`)

    this.room.removeAllListeners()
    try {
      if (this.sessionId && this.room) {
        await this.room.leave(true)
      }
    } catch (err) {
      console.warn(err)
    }

    this.sessionId = ''
    this.authPublicAddress = ''
    this.isInBackground = false
    this.room = undefined

    // Reset state whenever disconnected
    if (!hasLostConnection) {
      useGlobalStore.setState({ isConnected: false, lostConnection: false })
    } else {
      useGlobalStore.setState({ isConnected: false, lostConnection: true })
    }

    useSpinStore.setState({ ...initialSpinState })
  }

  async rejoin(authToken?: string, authPublicAddress?: string) {
    const token = authToken || localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN) || ''

    if (this.sessionId && this.room) {
      await this.leave()
    }
    await this.join(token, authPublicAddress)
  }

  sendChatMsg(_msg: string) {
    if (!this.room) return

    const msg = ensureString(_msg).trim()
    if (!msg || msg.length === 0 || msg.length > MAX_CHAT_MSG_LENGTH) return

    this.room.send(ROOM_EVENTS.NEW_GAME_CHAT_MESSAGE, msg)
  }

  bindStateEventListeners() {
    if (!this.room) return

    // @TODO: Handle WS errors here
    this.room.onError((code, message) => {
      switch (code) {
        case WebSocketCustomCodes.USER_MESSAGE_TIMEOUT:
          // @TODO: Need to add error message when user is timed out from spamming messages
          useSpinStore.getState().removeTimeoutChatMsg(this.authPublicAddress || '')
          alert(message)
          break
        case WebSocketCustomCodes.MESSAGE_VALIDATION_ERROR:
          console.warn(message)
          break
        case WebSocketCustomCodes.RESTRICTED_USER_ACTION:
          console.warn(message)
          break
        default:
          console.log('SPINROOMERROR', code, message)
          break
      }
    })

    this.room.onLeave(async code => {
      try {
        clearInterval(this.intervalId)
        this.unsubHeartBeat?.()
        this.unsubHeartBeat = undefined
        console.log(code, 'PLAYER LEFT', Date.now())
        console.log(console.log(new Date().toLocaleTimeString()))
        useGlobalStore.setState({ isConnected: false, lostConnection: true })
        this.sessionId = ''
        this.isInBackground = false
        this.room = undefined
        useSpinStore.setState({ ...initialSpinState })
        await this.leave(true)
      } catch (err) {
        console.error(err)
      } finally {
        console.log('Successfully left the room', this)
      }
    })

    this.room.onMessage(ROOM_EVENTS.TIMER_UPDATED, (countdown: number) => {
      useWheelStore.setState({ countdown })
    })

    this.room.onMessage(ROOM_EVENTS.SPIN_TICK, (spinTick: number) => {
      useWheelStore.setState({
        spinTickId: spinTick,
      })
    })

    // TODO: If 9 seconds goes by without a heartbeat initialize a reconnect interval
    // Server pings every 3 seconds to the client to ensure client is still connected
    // this.room.onMessage(ROOM_EVENTS.HEARTBEAT, (msg: string) => {
    //   console.log('Heartbeat received', msg)
    //   this.room?.send(ROOM_EVENTS.HEARTBEAT, String(this.authPublicAddress || '' + Date.now()))
    // })

    this.unsubHeartBeat = useGlobalStore.subscribe(
      (_state: GlobalStore, _prevState: GlobalStore) => {
        this.isInBackground = _state.isTabInBackground
      }
    )

    // TODO: This currently isn't being used and can be removed or find data that is required onLoad from server
    this.room.onMessage(ROOM_EVENTS.SEND_ROOM_DATA, (data: { chatMessages: IGameMessage[] }) => {
      const { chatMessages } = data
      useSpinStore.getState().addChatMsgs(chatMessages)
    })

    this.room.onMessage(ROOM_EVENTS.NEW_GAME_CHAT_MESSAGE, (_msg: string) => {
      try {
        const gameMessage = JSON.parse(_msg) as IGameMessage
        useSpinStore.getState().addChatMsg(gameMessage)
      } catch (err) {
        // @TODO: Handle a case where the json parse fails
        console.warn(err)
      }
    })

    this.intervalId = setInterval(() => {
      console.log('SENT HEART BEAT')
      this.room?.connection.transport.send([0])
    }, 15_000)

    this.room.onMessage(
      ROOM_EVENTS.USERNAME_UPDATED,
      ({ publicAddress, username }: { publicAddress: string; username: string }) => {
        useSpinStore.getState().updateChatMsgsUsername(publicAddress, username)
      }
    )

    this.room.onStateChange.once(state => {
      const { spinTick } = state

      useWheelStore.setState({
        spinTickId: spinTick,
      })
    })

    this.room.onStateChange(state => {
      const { countdownTotal, fareTotalSupply, roomStatus, isRoundPaused, currentRoundId } = state

      useSpinStore.setState({
        fareTotalSupply,
        roomStatus,
        isRoundPaused,
        currentRoundId,
        countdownTotal,
      })
      useWheelStore.setState({
        countdownTotal,
        isWheelSpinning: roomStatus === 'spinning' || roomStatus === 'finished',
      })
    })

    this.room.state.users.onAdd = (user, sessionId) => {
      useSpinStore.setState(prev => {
        prev.users.set(sessionId, user)
      })

      if (this.room?.sessionId === sessionId && user.balance) {
        useCryptoStore.getState().setFareBalance(user.fareBalance || '')
        useCryptoStore.getState().setEthBalance(user.ethBalance || '')
        // useSpinStore.getState().setMyBalance(user.balance)
      }

      user.onChange = changes => {
        const mapRecord = useSpinStore.getState().users.get(sessionId) as types.IUser
        if (!mapRecord) return

        // eslint-disable-next-line
        const changesMap: any = parseChanges(changes)

        // eslint-disable-next-line
        let newUser: any = {
          ...mapRecord,
          ...changesMap,
        }

        if (this.room?.sessionId === sessionId && !!changesMap.balance) {
          useCryptoStore.getState().setFareBalance(user.fareBalance || '')
          useCryptoStore.getState().setEthBalance(user.ethBalance || '')
        }

        useSpinStore.getState().setUser(sessionId, newUser)
      }
    }

    this.room.state.users.onRemove = (_user, sessionId) => {
      useSpinStore.getState().removeUser(sessionId)
    }

    this.room.state.guestUsers.onAdd = (guestUser, sessionId) => {
      useSpinStore.setState(prev => {
        prev.guestUsers.set(sessionId, guestUser)
      })
    }

    this.room.state.guestUsers.onRemove = (_guestPlayer, sessionId) => {
      useSpinStore.setState(prev => {
        prev.guestUsers.delete(sessionId)
      })
    }

    this.room.state.round.onAdd = (data, roundId) => {
      const round = {
        roundId: data.roundId,
        randomNum: data.randomNum,
        randomEliminator: data.randomEliminator,
        randomHash: data.randomHash,
        fullRandomNum: data.fullRandomNum,
        revealKey: data.fullRandomNum,
        startedAt: data.startedAt,
        endedAt: data.endedAt,
        isTwoXElim: data.isTwoXElim,
        isHundoXElim: data.isHundoXElim,
        isTenXElim: data.isTenXElim,
      }

      useSpinStore.getState().setPrevRound(roundId, data)
      useSpinStore.setState({ round })

      data.onChange = changes => {
        const roundChanges = parseChanges(changes)
        const updatedRound = {
          round: {
            ...round,
            ...roundChanges,
          },
        }

        useSpinStore.getState().setPrevRound(roundId, updatedRound.round)
        useSpinStore.setState(updatedRound)
      }
    }

    this.room.state.round.onRemove = (_round, roundId) => {
      useSpinStore.getState().clearPrevRound(roundId)
    }

    this.room.state.batchEntries.onAdd = (batchEntry, pubKey) => {
      useSpinStore.getState().setBatchEntries(batchEntry)

      if (batchEntry.player.toLowerCase() === this.authPublicAddress?.toLowerCase()) {
        useSpinStore.getState().setMySubmittedEntries(batchEntry)
        if (batchEntry.settled) {
          useSpinStore.getState().setPrevSubmittedEntries(batchEntry)
        }
      }

      batchEntry.onChange = changes => {
        const mapRecord = useSpinStore.getState().batchEntries.get(pubKey) as types.IBatchEntry
        if (!mapRecord) return

        // eslint-disable-next-line
        let newBatchEntry: any = {
          ...mapRecord,
          ...parseChanges(changes),
        }
        useSpinStore.getState().setBatchEntries(newBatchEntry)

        if (batchEntry.player.toLowerCase() === this.authPublicAddress?.toLowerCase()) {
          useSpinStore.getState().setMySubmittedEntries(batchEntry)
          if (newBatchEntry.settled) {
            useSpinStore.getState().setPrevSubmittedEntries(newBatchEntry)
            if (Number(newBatchEntry.totalMintAmount) > 0) {
              const claimableReward: SpinClaimable = {
                mintAmount: newBatchEntry.totalMintAmount,
                roundId: newBatchEntry.roundId,
              }
              useSpinStore.getState().addClaimableRewards(claimableReward)
            }
          }
        }
      }
    }

    this.room.state.batchEntries.onRemove = (batchEntry, pubKey) => {
      useSpinStore.getState().removeBatchEntry(pubKey)
      if (batchEntry.player.toLowerCase() === this.authPublicAddress?.toLowerCase()) {
        useSpinStore.getState().clearMySubmittedEntries()
      }
    }
  }
}

export default SpinRoom
