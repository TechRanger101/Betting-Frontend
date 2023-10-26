import { useEffect, useState } from 'react'

import {
  CloseButton,
  Header,
  SubheaderWrapper,
  Title,
  ToastIntervalBar,
  ToastWrapper,
} from './style'
import { type IToast } from '@/contexts/ToastContext'
import { useToast } from '@/hooks/useToast'
import { SVGS } from '@/assets'
import { type GameModes, ToastSpinner, type ToastModes } from '../shared/Spinner'

interface ISingleToastProps {
  toast: IToast
}

function SingleToast({ toast }: ISingleToastProps) {
  const { removeToast } = useToast()
  const [preserve, setPreserve] = useState(false)

  // Toast is responsible for removing itself
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!preserve) {
        removeToast(toast.hash)
      }
    }, toast.interval)

    return () => clearTimeout(timeout)
  }, [removeToast, toast, preserve])

  return (
    <ToastWrapper
      key={toast.hash}
      onMouseEnter={() => setPreserve(true)}
      onMouseLeave={() => setPreserve(false)}
      initial={{
        opacity: 0,
      }}
      animate={{
        x: [100, 0, 0, 0],
        opacity: [0, 1, 1, 1],
      }}
      exit={{
        x: [0, 0, 0, 100],
        opacity: [1, 1, 1, 0],
      }}
      transition={{
        duration: 1,
      }}
    >
      <Header>
        <Title>
          <ToastSpinner mode={toast.type as ToastModes} />
          <p>{toast.header}</p>
        </Title>
        <CloseButton onClick={() => removeToast(toast.hash)}>
          <img src={SVGS.crossIcon} alt="cancel" />
        </CloseButton>
        <ToastIntervalBar interval={toast.interval} type={toast.type} />
      </Header>
      {toast.subheader && <SubheaderWrapper>{toast.subheader}</SubheaderWrapper>}
    </ToastWrapper>
  )
}

export default SingleToast
