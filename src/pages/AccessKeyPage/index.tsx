import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { Navigate } from 'react-router-dom'
import { type SPEObject, type Application } from '@splinetool/runtime'
import shallow from 'zustand/shallow'
import { motion } from 'framer-motion'
import BasicConnectWallet from '@/components/shared/Wallet/BasicConnectWallet'
import { connectors } from '@/lib/crypto/connectors'
import { ConnectionType } from '@/constants/web3'
import useAccessKeyStore from '@/store/useAccessKeyStore'
import { FARE_COLORS } from '@/design'
import useAuth from '@/hooks/useAuth'
import fareAccessKey from '../../assets/spline/fp-key-scene.splinecode'

import { GamePageSpinner } from '../style'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SGamePageSpinner = styled(GamePageSpinner)`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 9999;
  left: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
`

const SAccessKeyPage = styled.div`
  background: #000000;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0px;
  display: flex;
  align-content: center;
  justify-content: center;
  > canvas {
    height: 100vh !important;
    width: 100% !important;
  }

  .spline-btn-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    /* top: 12px; */
    /* left: 12px; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .spline-btn-group {
      display: flex;
      flex-direction: row;
    }

    button {
      margin-right: 16px;
    }
  }
`

const SDiscordLink = styled(motion.a)`
  color: ${FARE_COLORS.aqua};
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50vh;
  font-size: 16px;
  padding-right: 11px;
`

enum SplineEv {
  Locked = 'Button Not Connected Wallet',
  Unlocked = 'Button Connected Wallet',
}

enum UGSplineEv {
  Locked = 'Button [Not Connected Wallet]',
  Unlocked = 'Button [Connected Wallet]',
  Enter = 'Button ENTER',
}

const SConnectKey = styled.button`
  text-transform: uppercase;
  border: 2px solid ${FARE_COLORS.pink};
  border-radius: 6px;
  font-weight: bold;
  color: white;
  background: linear-gradient(
    to right,
    ${FARE_COLORS.blue},
    /* ${FARE_COLORS.pink}, */ ${FARE_COLORS.salmon}
  );
  font-weight: 700;
  font-size: 36px;
  position: fixed;
  bottom: 172px;
  line-height: 36px;
  padding: 12px 16px;
`
const SceneLoading = () => {
  return (
    <SGamePageSpinner initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <p>LOADING</p>
      {/* <Spinner mode="default" blockSize={18} blockGap={6} /> */}
    </SGamePageSpinner>
  )
}

const AccessKeyScene = ({
  scene = fareAccessKey,
  isLoading,
  setIsLoading,
}: {
  scene: string
  isLoading: boolean
  setIsLoading: any
}) => {
  const { keyAnimName, hasAccess, setHasAccess } = useAccessKeyStore(
    state => ({
      keyAnimName: state.keyAnimName,
      hasAccess: state.hasAccess,
      setHasAccess: state.setHasAccess,
    }),
    shallow
  )

  const navigate = useNavigate()
  const { authPublicAddress, isWeb3Active } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasDelay, setHasDelay] = useState(true)
  const spline = useRef<Application>()
  const lockedObj = useRef<SPEObject>()
  const unlockedObj = useRef<SPEObject>()
  const enterBtnObj = useRef<SPEObject>()
  const isConnected = useRef<boolean>(false)

  // 'SPLINE_CLIPBOARD'
  const onLoad = useCallback(
    (splineApp: Application) => {
      spline.current = splineApp
      unlockedObj.current = spline.current.findObjectByName(UGSplineEv.Unlocked)
      lockedObj.current = spline.current.findObjectByName(UGSplineEv.Locked)
      enterBtnObj.current = spline.current.findObjectByName(UGSplineEv.Enter)
      setIsLoaded(true)
      setTimeout(() => setIsLoading(false), 100)

      if (unlockedObj.current) unlockedObj.current.visible = false

      if (lockedObj.current) lockedObj.current.visible = false

      if (isConnected.current) lockedObj.current?.emitEvent('mouseUp')
    },
    [setIsLoading]
  )

  const triggerUnlock = useCallback(() => {
    if (!spline.current || !unlockedObj.current) return

    unlockedObj.current.emitEvent('mouseUp')
  }, [spline])

  const triggerLock = useCallback(() => {
    if (!spline.current || !lockedObj.current) return
    lockedObj.current.emitEvent('mouseUp')
  }, [spline])

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        if (keyAnimName === 'locked') {
          triggerLock()
          isConnected.current = true
        } else if (keyAnimName === 'unlocked') {
          triggerUnlock()
        }
      }, 500)
    }

    const addCanvasListener = () => {
      if (keyAnimName === 'unlocked') {
        setTimeout(() => {
          navigate('/spin')
        }, 2_000)
        //   setHasAccess(true)
      }
    }

    const canvasElem = document.getElementById('spline-canvas')

    if (canvasElem) {
      canvasElem.addEventListener('mouseup', addCanvasListener)

      return () => {
        canvasElem.removeEventListener('mouseup', addCanvasListener)
      }
    }
  }, [keyAnimName, triggerLock, triggerUnlock, setHasAccess, isLoaded, navigate])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHasDelay(false)
    }, 1_000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <>
      {!hasDelay && (
        <Spline id="spline-canvas" className="spline-responsive" scene={scene} onLoad={onLoad} />
      )}
      {!authPublicAddress && (
        <div className="spline-btn-wrapper">
          <BasicConnectWallet isLoaded={isLoaded} />
        </div>
      )}
      {keyAnimName === 'locked' && (
        <div className="spline-btn-wrapper">
          <SDiscordLink
            href="https://discord.gg/eUEwY3vS8R"
            target="_blank"
            initial={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.75, delay: 3.5 }}
            animate={{ y: 0, opacity: 1 }}
          >
            discord.gg/eUEwY3vS8R
          </SDiscordLink>
        </div>
      )}
    </>
  )
}

const AccessKeyPage = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <SceneLoading />}
      <Web3ReactProvider connectors={connectors} key={ConnectionType.INJECTED}>
        <SAccessKeyPage>
          {/* <Suspense fallback={<SceneLoading />}> */}
          <AccessKeyScene
            // scene={fareAccessKey}
            scene={'https://d1d1tqm17vaml1.cloudfront.net/fp-key-scene.splinecode'}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </SAccessKeyPage>
      </Web3ReactProvider>
    </>
  )
}

export default AccessKeyPage
