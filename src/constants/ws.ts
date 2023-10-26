export const WS_URL = import.meta.env.VITE_WS_URL
// export const WS_URL = import.meta.env.VITE_WS_URL || 'wss://testapi.fareplay.io/ws'
// export const WS_URL = 'wss://testapi.fareplay.io/websocket'

export enum ROOM_NAMES {
  ChatRoom = 'ChatRoom',
  Lobby = 'Lobby',
  MediaStream = 'MediaStream',
  Metaverse = 'Metaverse',
  Spin = 'Spin',
}
export enum ROOM_EVENTS {
  TIMER_UPDATED = 'TimerUpdated',
  NEW_CHAT_MESSAGE = 'NewChatMessage',
  NEW_GAME_CHAT_MESSAGE = 'NewGameChatMessage',
  GUEST_USER_JOINED = 'GuestUserJoined',
  SEND_ROOM_DATA = 'SendRoomData',
  HEARTBEAT = 'Heartbeat',
  SPIN_TICK = 'SpinTick',
  USERNAME_UPDATED = 'UsernameUpdated',
}

export const MAX_CHAT_MSG_LENGTH = 140
export const MAX_CHAT_MSGS = 50

export enum WebSocketCustomCodes {
  /**
   * Indicates a user doesn't have access to perform this action
   */
  RESTRICTED_USER_ACTION = 3000,
  /**
   * Message parameter validation error
   */
  MESSAGE_VALIDATION_ERROR = 3001,

  USER_MESSAGE_TIMEOUT = 3002,
}
