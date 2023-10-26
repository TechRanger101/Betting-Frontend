import { motion } from 'framer-motion'
import type { SVGMotionProps } from 'framer-motion'

import { circleCountdownVariants } from '../../Wheel/animation'

export type CountdownCircleAnimProps = {
  percent: number
  delay?: number
}

export type ICountdownSvg = {
  custom: CountdownCircleAnimProps
  pathOnly?: boolean
  width?: number | string
  height?: number | string
} & SVGMotionProps<SVGPathElement>

const CountdownSvg = ({
  pathOnly = true,
  width = '100%',
  height = '100%',
  ...props
}: ICountdownSvg) => {
  const countdownPath = useMemo(
    () => (
      <motion.path
        d="M447.755 262c0 102.59-83.165 185.755-185.755 185.755-102.59 0-185.755-83.165-185.755-185.755C76.245 159.41 159.41 76.245 262 76.245c102.59 0 185.755 83.165 185.755 185.755Z"
        variants={circleCountdownVariants}
        // stroke="#E7EEF1"
        stroke="#1f212ccc"
        strokeLinecap={'round'}
        strokeOpacity={0.8}
        pathLength={0}
        strokeWidth={3}
        inherit={false}
        initial={'initial'}
        animate={'animateIn'}
        {...props}
      />
    ),
    [props]
  )

  if (!pathOnly) {
    return (
      <svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 524 524"
      >
        <g clipPath="url(#wheel-area)">{countdownPath}</g>
        <defs>
          <clipPath id="#wheel-area">
            <path fill="#fff" d="M0 0h524v524H0z" />
          </clipPath>
        </defs>
      </svg>
    )
  }
  return countdownPath
}

export default CountdownSvg
