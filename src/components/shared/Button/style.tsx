import { ButtonEnum } from '.'
import { BACKGROUND_COLORS, BORDER_COLORS, FARE_COLORS, TEXT_COLORS } from '@/design/colors'
import { FONT_STYLES } from '@/design'
import { BREAKPOINTS, SPACING } from '../../../design/spacing'
import { motion } from 'framer-motion'

export const flashBar = keyframes`
  0% {
    opacity: 0%;
  }

  50% {
    opacity: 100%;
  }

  100% {
    opacity: 0%;
  }
`

export const BaseButton = styled(motion.button)<{ buttonType?: ButtonEnum; isLoading?: boolean }>`
  text-transform: uppercase;
  color: ${TEXT_COLORS.one};
  padding: ${SPACING.sm}px;
  border-radius: 6px;
  cursor: pointer;
  bottom: ${SPACING.lg}px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid ${BORDER_COLORS.one};

  > img {
    margin-left: 6px;

    height: 18px;
  }

  > div:nth-child(2) {
    margin: 0 ${SPACING.sm}px;
  }

  /* @media only screen and (max-width: ${BREAKPOINTS.lg}px) { */
  /*   ${FONT_STYLES.xs} */
  /* } */

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  ${({ buttonType, isLoading }) => {
    if (buttonType === ButtonEnum.TRANSACTION) {
      return `
        border: 1px solid ${FARE_COLORS.blue};
        box-shadow: 0px 0px 3px ${FARE_COLORS.blue};
        background: ${isLoading ? 'transparent' : `${FARE_COLORS.blue}45`};

        &:hover {
          background: ${FARE_COLORS.blue}90;
          box-shadow: 0px 0px 10px ${FARE_COLORS.blue};
        }
      `
    }

    if (buttonType === ButtonEnum.CONNECT_WALLET) {
      return `
        border: 1px solid ${FARE_COLORS.aqua};
        box-shadow: 0px 0px 3px ${FARE_COLORS.aqua};
        background: ${isLoading ? 'transparent' : `${FARE_COLORS.aqua}35`};

        &:hover {
          background: ${FARE_COLORS.aqua}50;
          box-shadow: 0px 0px 10px ${FARE_COLORS.aqua};
        }
      `
    }
  }}
`

export const LoadingBar = styled.div<{
  side: 'left' | 'right'
  buttonType: ButtonEnum
}>`
  position: absolute;
  width: 2px;
  height: 16px;
  opacity: 0;
  animation: 2s ${flashBar} infinite;

  ${({ buttonType }) => {
    if (buttonType === ButtonEnum.TRANSACTION) {
      return `
        background: ${FARE_COLORS.blue};
      `
    }

    if (buttonType === ButtonEnum.CONNECT_WALLET) {
      return `
        background: ${FARE_COLORS.aqua};
      `
    }
  }}

  ${({ side }) => `
    ${side}: ${SPACING.xs}px;
  `}
`

export const ModeButton = styled.button<{ isActive?: boolean }>`
  height: 30px;
  min-width: 40px;
  border-radius: 4px;
  background: transparent;

  transition: 0.2s all ease-in-out;
  cursor: pointer;
  background: ${BACKGROUND_COLORS.two};

  ${({ isActive }) =>
    isActive
      ? `
    border: 1px solid ${FARE_COLORS.blue} !important;
    color: ${TEXT_COLORS.one};
    background: #410dff10;
    `
      : `
      border: 1px solid ${BORDER_COLORS.one};
      color: ${TEXT_COLORS.two}
  `};
`
