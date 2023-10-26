import { motion } from 'framer-motion'
import type { SVGMotionProps } from 'framer-motion'

import { WHEEL_TICK_PATHS } from '@/constants/wheel'
import useWheelTick from '@/hooks/useWheelTick'

import type { TickPathAnimProps } from './types'
import { pathVariants } from './animation'

export type IWheelSvgTickProps = SVGMotionProps<SVGPathElement> & {
  idx: number
  custom: TickPathAnimProps
}

const WheelSvgTick = ({ idx, custom, ...props }: IWheelSvgTickProps) => {
  const {
    wheelLoaded,
    spinTickId,
    isWheelSpinning,
    isTickHovered,
    // isTickSelected,
    onToggleSelect,
    onHover,
    onHoverLeave,
    isLimitReached,
    existsInQueue,
    existsInSubmittedMap,
  } = useWheelTick(custom.color, idx)

  const dPath = useMemo(() => WHEEL_TICK_PATHS[Number(idx)], [idx])

  const getSpinTickIdx = useCallback(() => {
    const tickDiff = spinTickId - idx
    if (tickDiff === 0 && existsInSubmittedMap) {
      return 'tickSpinBetActive'
    } else if (tickDiff === 0) {
      return 'tickSpinActive'
    } else if (existsInSubmittedMap) {
      return 'tickSpinBetInactive'
    } else {
      return 'tickSpinInactive'
    }
    // else if (between(tickDiff, 0, 5)) {
    //   return 'tickSpinInactive'
    //   // return 'tickRecentlyActive'
    // }
  }, [spinTickId, idx, existsInSubmittedMap])

  const animateValue = useMemo(() => {
    if (isWheelSpinning) {
      return getSpinTickIdx()
    } else if (existsInQueue || existsInSubmittedMap) {
      return 'existsInQueue'
    } else if (isLimitReached) {
      return 'limitReached'
    } else if (isTickHovered) {
      return 'colorHovered'
    } else if (wheelLoaded) {
      return 'wheelLoaded'
    } else {
      return 'animateIn'
    }
    // else if (isTickSelected) {
    //   return 'colorSelected'
    // }
  }, [
    getSpinTickIdx,
    isTickHovered,
    existsInSubmittedMap,
    // isTickSelected,
    wheelLoaded,
    isWheelSpinning,
    isLimitReached,
    existsInQueue,
  ])

  const initialValue = useMemo(() => {
    if (isWheelSpinning) {
      return 'initialSpinning'
    } else {
      return 'initial'
    }
  }, [isWheelSpinning])

  return (
    <motion.path
      initial={initialValue}
      onClick={onToggleSelect}
      animate={animateValue}
      onHoverStart={onHover}
      onHoverEnd={onHoverLeave}
      variants={pathVariants}
      d={dPath}
      custom={custom}
      {...props}
    />
  )
}

export default memo(WheelSvgTick)
