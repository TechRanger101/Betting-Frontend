import { motion } from 'framer-motion'
import { FONT_STYLES, SPACING, TEXT_COLORS, BREAKPOINTS } from '@/design'

export const SFetchingBets = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${TEXT_COLORS.three};
  flex: 1;
  position: sticky;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  bottom: 0;
  text-transform: uppercase;
  ${FONT_STYLES.sm}

  > div {
    margin-bottom: ${SPACING.md}px;
  }
`

export const BetsContainer = styled.div`
  padding: ${SPACING.md}px;
  padding-left: ${SPACING.md}px;
`

export const SSubmittedAlert = styled(motion.div)`
  text-align: center;
  padding: ${SPACING.sm}px;
  text-transform: uppercase;
  width: 100%;
  margin: 0px -${SPACING.md}px;
  backdrop-filter: none;
  border-top: 1px solid #00e676;
  border-bottom: 1px solid #00e676;
  background: linear-gradient(90deg, #34a552 0%, #175a29 100%);
  box-shadow: 0 0 6px #00e676;
  background: linear-gradient(90deg, rgba(52, 165, 82, 0.5) 0%, rgba(23, 90, 41, 0.5) 100%);
  user-select: none;
`

export const SWarning = styled(motion.div)`
  text-align: center;
  padding: ${SPACING.sm}px;
  text-transform: uppercase;
  width: 100%;
  margin: 0px -${SPACING.md}px;
  backdrop-filter: none;
  border-top: 1px solid #00e676;
  border-bottom: 1px solid #00e676;
  background: linear-gradient(90deg, #34a552 0%, #175a29 100%);
  box-shadow: 0 0 6px rgb(252 165 10);
  background: linear-gradient(90deg, rgba(52, 165, 82, 0.5) 0%, rgba(23, 90, 41, 0.5) 100%);
  border-top: 1px solid rgb(252 165 10);
  border-bottom: 1px solid rgb(252 165 10);
  background: linear-gradient(90deg, #654719 0%, #6b2727 100%);
  user-select: none;
`

export const SSubmittedOverlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: brightness(40%);
`

export const ModeButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  button {
    grid-column: span 1;

    &:not(:first-of-type) {
      border-left: 1px solid transparent;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:not(:last-of-type) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`

export const DetailsColumn = styled.div`
  width: 100%;
  justify-content: space-between;

  > * {
    margin: auto 0;
  }

  img {
    margin-right: ${SPACING.xs}px;
  }
`

export const ActionColumn = styled.div`
  height: 16px;
  width: 16px;
  filter: invert(1);
  margin: auto;
  margin-right: 0;

  img {
    cursor: pointer;
  }
`

export const SpinWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  padding: ${SPACING.xxs}px;
  border-radius: 50%;
  animation-delay: 1.5s;
  margin: auto;
`

export const CounterBarWrapper = styled.div`
  position: absolute;
  width: 320px;
  height: 320px;
  margin: 40px;
`

export const WheelStat = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    margin: auto 0;
  }

  img {
    height: 16px;
    width: 16px;
  }
`

export const BetCart = styled(motion.div)`
  margin-bottom: 8px;
`

export const activeBetGradientBg = css<{ color: string; doesMatch: boolean }>``

export const BetCard = styled(motion.div)<{ color: string; isActive: boolean; doesMatch: boolean }>`
  padding: ${SPACING.sm}px;
  display: flex;
  justify-content: space-between;
  /* transition: ease-in-out all 0.02s; */

  ${({ color, isActive, doesMatch }) => `
    border-left: 4px solid ${doesMatch || !isActive ? color : 'transparent'};
    background: linear-gradient(90deg, ${color}${doesMatch ? 35 : 20}, ${color}05);
  `}

  div {
    display: flex;
  }

  p {
    margin: 0;
    margin-right: ${SPACING.sm}px;
    line-height: 1.5;
  }

  button {
    height: 22px;
    width: 40px !important;
    background: black;
    ${FONT_STYLES.xs}

    &:first-of-type {
      margin-right: ${SPACING.sm}px;
    }
  }

  &:not(:last-of-type) {
    margin-bottom: ${SPACING.xs}px;
  }
`

export const CartStats = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${TEXT_COLORS.one};
`

export const TwoXButton = styled.button<{ isActive?: boolean; color: string }>`
  border-radius: 6px;
  background: transparent;
  color: ${TEXT_COLORS.one};
  transition: 0.1s all ease-in-out;
  cursor: pointer;
  height: 30px;
  border: 1px solid ${props => props.color};
  flex: 1;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: center !important;

  &:nth-of-type(odd) {
    margin-right: 5px;
  }

  &:nth-of-type(even) {
    margin-left: 5px;
  }

  ${({ isActive, color }) =>
    isActive &&
    css`
      border: 1px solid ${color};
      box-shadow: inset 0px 0px 10px 0px ${color};
    `}
`

interface SColorBoxProps {
  color: string
  isActive?: boolean
  disabled?: boolean
  isDisabled?: boolean
  onClick?: () => void
  onMouseOver?: () => void
  onMouseLeave?: () => void
  isInQueue?: boolean
  notClickable?: boolean
}

export const SColorBox = styled.button.attrs<SColorBoxProps>(props => ({
  style: {
    cursor: props.isInQueue || props.isDisabled ? 'not-allowed' : 'pointer',
    filter: props.isDisabled
      ? 'brightness(50%)'
      : props.notClickable
      ? 'brightness(30%)'
      : props.isInQueue
      ? 'brightness(75%)'
      : undefined,
    boxShadow: props.isInQueue && props.isDisabled ? `0px 0px 15px 0px ${props.color}` : undefined,
    opacity: props.isInQueue && !props.isDisabled ? 1 : undefined,
    background:
      (props.isActive && !props.isInQueue) || props.isInQueue ? props.color : 'transparent',
    border:
      props.isDisabled || props.notClickable || props.isInQueue
        ? `2px solid ${props.color}`
        : `1px solid ${props.color}`,
  },
  className: `${props.isActive && !props.isInQueue ? 'active' : ''} ${
    props.isInQueue ? 'queue' : ''
  }`,
}))<SColorBoxProps>`
  border-radius: 3px;
  height: 22px;
  width: 22px;
  flex: 0 1 calc(10% - 8px);
  transition: 0.1s all ease-in-out;

  @media only screen and (max-width: ${BREAKPOINTS.lg}px) {
    height: 20px;
    width: 20px;
  }

  @media only screen and (max-width: ${BREAKPOINTS.md}px) {
    height: 16px;
    width: 16px;
  }

  &:hover:not(:disabled) {
    ${({ isActive, isInQueue, color }) =>
      !isActive &&
      !isInQueue &&
      css`
        box-shadow: inset 0px 0px 5px 0px ${color};
        border: 1px solid ${color};
      `}
  }

  &.active {
    ${({ color }) => css`
      border: 1px solid ${color};
      background: ${color};
      box-shadow: 0px 0px 15px 0px ${color};
    `};
  }

  &.queue {
    ${({ color, isDisabled }) => css`
      border: 1px solid ${color};
      background: ${color};
      opacity: ${isDisabled ? 1 : 0.6};
      filter: ${isDisabled ? 'brightness(120%)' : undefined};
    `};
  }
`

export const SColorBoxImproved = styled.button.attrs<{ boxColor: string }>(props => ({
  style: {
    '--box-color': props.boxColor,
  },
}))<{ boxColor: string }>`
  cursor: pointer;
  border-radius: 3px;
  height: 22px;
  width: 22px;
  flex: 0 1 calc(10% - 8px);
  transition: 0.1s all ease-in-out;

  @media only screen and (max-width: ${BREAKPOINTS.lg}px) {
    height: 20px;
    width: 20px;
  }

  @media only screen and (max-width: ${BREAKPOINTS.md}px) {
    height: 16px;
    width: 16px;
  }

  background: transparent;
  border: 1px solid var(--box-color);
  box-shadow: inset 0px 0px 5px 0px var(--box-color);

  &:not(.isNotClickable):not(.isDisabled):not(.isInQueue):hover {
    filter: brightness(120%);
    box-shadow: inset 0px 0px 5px 0px var(--box-color), 0px 0px 15px 0px var(--box-color);
    border: 1px solid var(--box-color);
    background: var(--box-color);
  }

  &.isDisabled {
    filter: brightness(50%);
    box-shadow: none;
    border: 2px solid var(--box-color);
    cursor: not-allowed;
  }

  &.isNotClickable {
    cursor: not-allowed;
    filter: brightness(30%);
    box-shadow: none;
    border: 2px solid var(--box-color);
  }

  &.isActive {
    border: 1px solid var(--box-color);
    background: var(--box-color);
    box-shadow: 0px 0px 15px 0px var(--box-color);
  }

  &.isInQueue {
    border: 1px solid var(--box-color);
    background: var(--box-color);
    opacity: 1;
    filter: brightness(120%);
    cursor: not-allowed;
    box-shadow: 0px 0px 0px 0px var(--box-color);
  }

  &.isInQueueDisabled {
    filter: brightness(75%);
    box-shadow: 0px 0px 15px 0px var(--box-color);
  }

  &:hover:not([data-disabled='true']).isNotClickable {
    filter: brightness(30%);
    box-shadow: none;
    border: 2px solid var(--box-color);
  }

  &:hover:not([data-disabled='true']).isActive:not(.isInQueue),
  &:hover:not([data-disabled='true']).isInQueueDisabled {
    box-shadow: inset 0px 0px 5px 0px var(--box-color);
    border: 1px solid var(--box-color);
  }
`

export const SColorPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6px;

  ${TwoXButton} {
    &:first-child {
      margin-right: 5px;
    }
    &:last-child {
      margin-left: 5px;
    }
  }
`

const counter = keyframes`
  from {
    width: 0;
  }
`

export const RewardsCountdown = styled.div<{ progress: number; duration: number; color: string }>`
  width: ${({ progress }) => `${progress}%`};
  height: 4px;
  background: ${({ color }) => color};
  animation: ${({ duration }) => `${duration}s`} ${counter};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`

export const FooterWrapper = styled.div`
  display: flex;
  height: fit-content;

  > * {
    margin: 0;
    align-items: center;
  }
`

export const StatHeader = styled.div`
  text-transform: uppercase;
  color: ${TEXT_COLORS.two};
`

export const StatColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${SPACING.md}px;
  padding: 0;

  > ${StatHeader} {
    ${FONT_STYLES.xs}
  }
`

export const RoundResultWrapper = styled.div`
  padding: ${SPACING.md}px;
  padding-top: ${SPACING.xs}px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;

  > div {
    display: grid;
    grid-template-columns: 1fr max-content;
    width: fit-content;
    margin: auto;
    align-items: center;

    > ${SColorBox} {
      margin: auto;
      ${FONT_STYLES.xs}
      padding: ${SPACING.xxs}px;
      height: 20px !important;
      width: 20px !important;
    }

    > p {
      margin-left: ${SPACING.xs}px;
    }
  }
`
