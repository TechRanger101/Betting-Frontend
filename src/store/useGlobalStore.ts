import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type GlobalState = {
  isConnected: boolean
  lostConnection: boolean
  isTabInBackground: boolean
  isUserInactive: boolean
}

export type GlobalActions = {
  setIsConnected: (isConnect: boolean) => void
}

export const initialGlobalState: GlobalState = {
  isConnected: false,
  lostConnection: false,
  isTabInBackground: false,
  isUserInactive: false,
}

export type GlobalStore = GlobalState & GlobalActions

const useGlobalStore = create<GlobalStore, [['zustand/immer', GlobalStore]]>(
  immer(set => ({
    ...initialGlobalState,
    setIsConnected: isConnected =>
      set(() => ({
        isConnected,
      })),
  }))
)

export default useGlobalStore
