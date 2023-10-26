import { createContext, type ReactElement, useState } from 'react'

export type IToast = {
  header: string | JSX.Element
  subheader?: string | JSX.Element
  hash?: string
  timeout?: any
  interval?: number
  type: 'default' | 'success' | 'error'
}

interface IToastContextType {
  toasts: IToast[]
  setToasts: (toasts: IToast[]) => void
}

interface IToastContextProviderProps {
  children: ReactElement
}

export const ToastContext = createContext<IToastContextType>({
  toasts: [],
  setToasts: () => {},
})

export function ToastContextProvider({ children }: IToastContextProviderProps) {
  const [toasts, setToasts] = useState<IToast[]>([])

  return <ToastContext.Provider value={{ toasts, setToasts }}>{children}</ToastContext.Provider>
}
