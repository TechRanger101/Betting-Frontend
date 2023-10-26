import { motion, AnimatePresence } from 'framer-motion'
import shallow from 'zustand/shallow'
import useSpinStore from '@/store/useSpinStore'
import type { SVGProps, Ref } from 'react'

import { generateColorList } from '@/utils/spin'
import useWheelStore from '@/store/useWheelStore'

import type { CountdownCircleAnimProps } from '../shared/Svg/CountdownSvg'
import type { IWheelSvgTickProps } from './WheelSvgTick'
import WheelSvgTick from './WheelSvgTick'
import WheelCountdown from './WheelCountdown'
import WheelNoEntries from './WheelNoEntries'
import CountdownSvg from '../shared/Svg/CountdownSvg'
import { WheelSvgDefs } from '../shared/Svg/SvgFilters'
import type { TickPathAnimProps } from './types'

export interface IWheelSvgProps {
  width?: number | string
  height?: number | string
}

const STickGroup = styled(motion.g)`
  .tick-path {
    /* cursor: pointer; */
  }
`

const WheelSvg = (
  { width = '100%', height = '100%' }: IWheelSvgProps & SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => {
  const { roomStatus } = useSpinStore(state => ({ roomStatus: state.roomStatus }), shallow)
  const { wheelLoaded, isWheelSpinning, setWheelLoaded, countdownTotal, countdown, gameMode } =
    useWheelStore(
      state => ({
        wheelLoaded: state.wheelLoaded,
        isWheelSpinning: state.isWheelSpinning,
        setWheelLoaded: state.setWheelLoaded,
        countdownTotal: state.countdownTotal,
        countdown: state.countdown,
        gameMode: state.selectedGameMode,
      }),
      shallow
    )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setWheelLoaded(true)
    }, 950)

    return () => clearInterval(timeoutId)
  }, [setWheelLoaded])

  const gameModeColors = useMemo(() => generateColorList(gameMode), [gameMode])

  const isCountdownVisible = useMemo(
    () => !isWheelSpinning && wheelLoaded && roomStatus === 'countdown',
    [isWheelSpinning, wheelLoaded, roomStatus]
  )

  const isWaitingForFirstEntry = useMemo(
    () => roomStatus === 'waiting-for-first-entry',
    [roomStatus]
  )

  const svgTickPathElems = useMemo(() => {
    return gameModeColors.map((color, id) => {
      const tickProps = {
        idx: id,
        fill: color,
        transformBox: 'fill-box',
        transformOrigin: '50% 50%',
        className: 'tick-path',
        custom: {
          id,
          color,
        } as TickPathAnimProps,
      } as IWheelSvgTickProps

      return <WheelSvgTick key={id} {...tickProps} />
    })
  }, [gameModeColors])

  const countdownSvgAnimProps = useMemo(
    () =>
      ({
        // TODO: Need to fetch total countdown secs from server rather than a const
        percent: countdown / countdownTotal,
        delay: 0,
      } as CountdownCircleAnimProps),
    [countdown, countdownTotal]
  )

  return (
    <>
      <AnimatePresence>
        {isCountdownVisible && (
          <WheelCountdown
            countdown={countdown}
            countdownTotal={countdownTotal}
            key="wheel-countdown"
          />
        )}
        {isWaitingForFirstEntry && <WheelNoEntries key="wheel-no-entries" />}
      </AnimatePresence>
      <motion.svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 524 524"
        ref={ref}
      >
        <STickGroup clipPath="url(#wheel-area)">
          {svgTickPathElems}
          <AnimatePresence>
            {isCountdownVisible && (
              <CountdownSvg
                initial={'initial'}
                animate={'animateIn'}
                exit={'exit'}
                custom={countdownSvgAnimProps}
              />
            )}
          </AnimatePresence>
        </STickGroup>
        <WheelSvgDefs />
      </motion.svg>
    </>
  )
}

export default memo(forwardRef(WheelSvg))
