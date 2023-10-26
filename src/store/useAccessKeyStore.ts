import create from 'zustand'

type KeyAnimationName = 'none' | 'locked' | 'unlocked'

export type AccessKeyState = {
  isConnecting: boolean
  keyAnimName: KeyAnimationName
  hasAccess: boolean
}

export type AccessKeyStateActions = {
  setIsConnecting: (isConnecting: boolean) => void
  setKeyAnimName: (keyAnimName: KeyAnimationName) => void
  setHasAccess: (hasAccess: boolean) => void
}

export const initialAccessKeyState: AccessKeyState = {
  isConnecting: false,
  keyAnimName: 'none',
  hasAccess: false,
}

export type AccessKeyStore = AccessKeyState & AccessKeyStateActions

const useAccessKeyStore = create<AccessKeyStore>(set => ({
  ...initialAccessKeyState,
  setIsConnecting: isConnecting => set({ isConnecting }),
  setKeyAnimName: keyAnimName => set({ keyAnimName }),
  setHasAccess: hasAccess => set({ hasAccess }),
}))

export default useAccessKeyStore
