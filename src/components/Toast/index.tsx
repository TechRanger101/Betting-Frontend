import { AnimatePresence } from 'framer-motion'
import { useToast } from '@/hooks/useToast'
import { ToastListWrapper } from './style'
import SingleToast from './SingleToast'

export function Toast() {
  const { toasts } = useToast()
  return (
    <ToastListWrapper>
      <AnimatePresence>
        {toasts.map(toast => (
          <SingleToast key={toast.hash} toast={toast} />
        ))}
      </AnimatePresence>
    </ToastListWrapper>
  )
}
