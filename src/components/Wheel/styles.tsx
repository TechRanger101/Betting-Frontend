import { motion } from 'framer-motion'
import { FONT_STYLES, TEXT_COLORS } from '@/design'
import { SPACING } from '../../design/spacing'

export const neonAnim = keyframes`
  from {
    filter: drop-shadow( 0 0 5px #fff) drop-shadow( 0 0 15px #e60073) drop-shadow( 0 0 20px #e60073);
  }

  to {
    
    filter: drop-shadow( 0 0 20px #fff) drop-shadow( 0 0 25px #e60073) drop-shadow( 0 0 40px #e60073);
  }
`

export const pulsateNeonTextKeyframe = keyframes`
 100% {
      text-shadow: 0px 0px 5px #E57373, 0px 0px 10px #E57373, 1px 1px 50px #E57373;
  }
  
  0% {
      text-shadow: 0px 0px 15px #F44336, 0px 0px 30px #F44336, 1px 1px 70px #F44336;
  }
`

export const neonCircles = css<{ countdown: number }>`
  .neon {
    position: relative;
    overflow: hidden;
    filter: brightness(120%);
  }

  .text {
    padding-left: ${SPACING.sm}px;
    padding-right: ${SPACING.sm}px;
    background-color: black;
    color: ${TEXT_COLORS.one};
    font-family: sans-serif;
    text-transform: uppercase;
    position: relative;
    user-select: none;
  }

  .text::before {
    content: ${props => props.countdown};
    position: absolute;
    color: ${TEXT_COLORS.one};
    filter: blur(0.02em);
    mix-blend-mode: difference;
  }

  .gradient {
    position: absolute;
    background: white;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    mix-blend-mode: multiply;
  }

  .spotlight {
    position: absolute;
    top: -100%;
    left: -100%;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, white, transparent 25%) center / 25% 25%,
      radial-gradient(circle, white, black 25%) center / 12.5% 12.5%;
    animation: light 5s linear infinite;
    mix-blend-mode: color-dodge;
  }

  @keyframes light {
    to {
      transform: translate(50%, 50%);
    }
  }
`

export const SWheelCountdown = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: fit-content;
  text-align: center;
  width: 300px;
  border-radius: 8px;
`

export const WheelRatio = styled.div`
  display: flex;
  margin: ${SPACING.xs}px 0;
  height: 6px;

  span {
    border-radius: 6px;

    &:nth-child(1) {
      border: 1px solid #0fb4ff;
      box-shadow: inset 0px 0px 10px #008fba99;
    }

    &:nth-child(2) {
      border: 1px solid #6d0fff;
      box-shadow: inset 0px 0px 10px #a45fff75;
    }

    &:nth-child(3) {
      border: 1px solid #ff0f6c;
      box-shadow: inset 0px 0px 10px #ff5f9075;
    }

    &:not(:first-of-type) {
      margin-left: ${SPACING.xxs}px;
    }
  }
`

export const SWheelContent = styled(motion.div)<{ countdown: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const SCountdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const CountdownTitle = styled.div`
  ${FONT_STYLES.sm}
  margin-bottom: 6px;
`

export const CountdownNumber = styled.div`
  ${FONT_STYLES.md}
`
