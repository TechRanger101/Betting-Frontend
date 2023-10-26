// This hook is solely responsible for the management of toasts rendered on a global level
// A toast is added to a queue with varying intervals to be removed
// We hash each toast and clear it from the queue based on its hash

import { ethers } from 'ethers'
import { useCallback, useContext, useRef } from 'react'
import { type IToast, ToastContext } from '@/contexts/ToastContext'

function generateToastHash(): string {
  // Generate toast hash and pass into queueing toast
  return ethers.utils.id(new Date().getMilliseconds().toString())
}

export function useToast() {
  // Attach intervals and remove based on toast hash after timeout
  const { toasts, setToasts } = useContext(ToastContext)

  // We use a reference to toasts so that it will not trigger re-renders
  const toastsRef = useRef<IToast[]>([])
  toastsRef.current = toasts

  const removeToast = useCallback(
    (id?: string) => {
      if (id) {
        setToasts(toastsRef.current.filter(toast => toast.hash !== id))
      }
    },
    [setToasts]
  )

  const addToast = useCallback(
    (toast: IToast) => {
      const toastHash = generateToastHash()

      const newToast = {
        ...toast,
        interval: toast.interval || 5000,
        hash: toastHash,
      }
      setToasts([newToast, ...toasts])
    },
    [setToasts, toasts]
  )

  return {
    toasts,
    addToast,
    removeToast,
  }
}
