import shallow from 'zustand/shallow'
import { type PropsWithChildren } from 'react'
import { FloatingContainer, GamePageSpinner, PageWrapper } from './style'
import { type GameModes, Spinner } from '@/components/shared/Spinner'
import useGlobalStore from '@/store/useGlobalStore'
import MountSpinRoom from '@/components/SpinForm/MountSpinRoom'

interface IGamePageProps extends PropsWithChildren {
  mode: GameModes
}

export const GamePage = ({ children, mode }: IGamePageProps) => {
  const isUserInactive = false
  const { isConnected, lostConnection } = useGlobalStore(
    state => ({
      isConnected: state.isConnected,
      lostConnection: state.lostConnection,
    }),
    shallow
  )

  const location = useLocation()

  const isSpinRoom = useMemo(() => location.pathname === '/spin', [location.pathname])

  useEffect(() => {
    const handleVisibilityChange = () => {
      useGlobalStore.setState({ isTabInBackground: document.visibilityState === 'hidden' })
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    if (!isSpinRoom) {
      useGlobalStore.setState({ isConnected: true, lostConnection: false })
    } else {
      useGlobalStore.setState({ isConnected: false, lostConnection: false })
    }
  }, [isSpinRoom])

  console.log(isConnected, lostConnection, isSpinRoom)

  // @TODO: Need to refactor this
  // const pageRenderer = useMemo(() => {
  //   if (!isConnected && !lostConnection && isSpinRoom) {
  //     return (
  //       <GamePageSpinner>
  //         <Spinner mode={mode} blockSize={12} blockGap={6} />
  //         <p>Setting up {mode}...</p>
  //       </GamePageSpinner>
  //     )
  //   } else if (lostConnection && isSpinRoom) {
  //     return (
  //       <MountSpinRoom
  //         isConnected={isConnected}
  //         lostConnection={lostConnection}
  //         isUserInactive={isUserInactive}
  //       />
  //     )
  //   } else if (!isConnected && lostConnection) {
  //     return null
  //   } else {
  //     return (
  //       <FloatingContainer
  //         transition={{
  //           duration: 0.5,
  //           ease: 'easeIn',
  //         }}
  //         initial={{
  //           opacity: 0,
  //           transform: 'scale(0.95)',
  //         }}
  //         animate={{
  //           opacity: 1,
  //           transform: 'scale(1)',
  //         }}
  //         exit={{
  //           opacity: 0,
  //           transform: 'scale(0.95)',
  //         }}
  //       >
  //         {children}
  //       </FloatingContainer>
  //     )
  //   }
  // }, [isConnected, lostConnection, isSpinRoom, mode, isUserInactive, children])

  const pageRenderer = useMemo(() => {
    if (!isConnected && !lostConnection && isSpinRoom) {
      return (
        <GamePageSpinner>
          <Spinner mode={mode} blockSize={12} blockGap={6} />
          <p>Setting up {mode}...</p>
        </GamePageSpinner>
      )
    } else {
      return (
        <FloatingContainer
          transition={{
            duration: 0.5,
            ease: 'easeIn',
          }}
          initial={{
            opacity: 0,
            transform: 'scale(0.95)',
          }}
          animate={{
            opacity: 1,
            transform: 'scale(1)',
          }}
          exit={{
            opacity: 0,
            transform: 'scale(0.95)',
          }}
        >
          {children}
        </FloatingContainer>
      )
    }
  }, [isConnected, lostConnection, isSpinRoom, mode, children])

  return (
    <>
      <PageWrapper>
        {pageRenderer}
        {isSpinRoom && (
          <MountSpinRoom
            isConnected={isConnected}
            lostConnection={lostConnection}
            isUserInactive={isUserInactive}
          />
        )}
      </PageWrapper>
    </>
  )
}
