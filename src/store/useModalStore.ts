import create from 'zustand'
import { LOCAL_STORAGE } from '@/constants/utils'

export type ModalStateActions = {
  setHasAgreedTermsConditions: (doesAgree: boolean) => void
}

export type ModalState = {
  hasAgreedTermsConditions: string
  isOpen: boolean
  title: string
  desc: string
}

export const initialModalState: ModalState = {
  isOpen: false,
  title: '',
  desc: '',
  hasAgreedTermsConditions: localStorage.getItem(LOCAL_STORAGE.TERMS_CONDITIONS) || '',
}

const useAuthStore = create<ModalState & ModalStateActions>(set => ({
  ...initialModalState,
  setHasAgreedTermsConditions: doesAgree =>
    set(() => {
      if (doesAgree) {
        localStorage.setItem(LOCAL_STORAGE.TERMS_CONDITIONS, doesAgree.toString())
      }
      return { hasAgreedTermsConditions: 'true' }
    }),
}))

export default useAuthStore
