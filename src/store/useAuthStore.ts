import create from 'zustand'
import { LOCAL_STORAGE } from '@/constants/utils'
import { ConnectionType } from '@/constants/web3'

export type AuthState = {
  isAuthing: boolean
  isVerifying: boolean
  authToken: string
  connectorKey: ConnectionType
  authPublicAddress: string
  username: string
}

export type AuthStateActions = {
  setIsAuthing: (isAuthing: boolean) => void
  setIsVerifying: (isVerifying: boolean) => void
  setAuthToken: (authToken: string) => void
  removeAuthToken: () => void
  setAuthPublicAddress: (publicAddress: string) => void
  setUsername: (username: string) => void
}

export const initialAuthState: AuthState = {
  isAuthing: false,
  isVerifying: false,
  authToken: localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN) || '',
  connectorKey: ConnectionType.INJECTED,
  authPublicAddress: '',
  username: '',
}

export type AuthStore = AuthState & AuthStateActions

const useAuthStore = create<AuthStore>(set => ({
  ...initialAuthState,
  setUsername: username => set(() => ({ username })),
  setIsAuthing: isAuthing => set(() => ({ isAuthing })),
  setIsVerifying: isVerifying => set(() => ({ isVerifying })),
  setAuthPublicAddress: authPublicAddress => set(() => ({ authPublicAddress })),
  setAuthToken: authToken =>
    set(() => {
      localStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN, authToken)
      return { authToken }
    }),
  removeAuthToken: () =>
    set(() => {
      localStorage.removeItem(LOCAL_STORAGE.AUTH_TOKEN)
      return {
        authToken: '',
      }
    }),
}))

export default useAuthStore
