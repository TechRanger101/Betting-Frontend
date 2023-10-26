import { motion } from 'framer-motion'
import {
  BORDER_COLORS,
  COMPONENTS,
  SPACING,
  BREAKPOINTS,
  FONT_STYLES,
  floatingContainer,
  TEXT_COLORS,
  BACKGROUND_COLORS,
} from '@/design'

export const HeaderWrapper = styled.div<{
  mode: 'win' | 'lose' | 'default'
  isShowPanel?: boolean
}>`
  display: flex;
  height: fit-content;
  justify-content: space-between;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-top: 1px solid ${BORDER_COLORS.one};
  cursor: pointer;
  transition: 0.25s ease-in-out;
  height: ${COMPONENTS.panelTabHeader}px;
  padding: 0 ${SPACING.sm}px;
  border-bottom: 1px solid ${BORDER_COLORS.one};
  background: ${BACKGROUND_COLORS.two};

  > div {
    display: flex;
    margin: auto 0;
    height: fit-content;
  }

  @media only screen and (max-width: ${BREAKPOINTS.lg}px) {
    line-height: 22px;
  }

  > * {
    margin: 0;
    align-items: center;
  }

  p {
    margin: 0;
    margin-left: ${SPACING.md}px;
    ${FONT_STYLES.md}
    height: auto;
  }

  img {
    margin: auto 0;
    width: 16px;
    height: 16px;
    padding: 0;
    filter: invert();
  }
`

export const RewardsWrapper = styled(motion.div)<{ isShowPanel?: boolean }>`
  border-radius: 6px;
  opacity: 1;
  height: fit-content;
  margin-bottom: ${SPACING.md}px;
  position: sticky;
  top: 0;
  z-index: 100;
  overflow: hidden;
  ${floatingContainer}
  ${({ isShowPanel }) => !isShowPanel && `border-bottom: 0;`}
  border-top: none;

  > *:not(${HeaderWrapper}) {
    padding: ${SPACING.sm}px;
    width: inherit;
  }
`

export const StatWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
`

export const StatRow = styled.div<{ color?: string }>`
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  padding: ${SPACING.xxs}px 0px;
  color: ${({ color }) => color ?? TEXT_COLORS.two};

  > *:last-of-type {
    color: ${TEXT_COLORS.one};
  }

  p {
    margin: 0;
    display: flex;
  }

  img {
    width: 16px;
    height: 16px;
    align-self: center;
    margin-right: ${SPACING.md}px;
  }
`

export const StatFooter = styled(motion.div)<{
  amount?: number
  isShowPanel?: boolean
  disabled?: boolean
}>`
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  color: ${({ color }) => color ?? TEXT_COLORS.one};
  transition: 0.25s ease-in-out;
  position: relative;
  border-radius: 0;
  border-bottom: 1px solid ${BORDER_COLORS.one};
  border-top: none;

  div {
    display: flex;
    margin: auto 0;
    opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  }

  > span:last-of-type {
    margin-left: ${SPACING.xs}px;
    opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  }

  img {
    width: 16px;
    height: 16px;
    margin-right: ${SPACING.sm}px;
    opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  }

  ${({ amount, disabled, isShowPanel }) => {
    if (disabled && isShowPanel) {
      return `
      background: transparent;
      border-top: 1px solid ${BORDER_COLORS.one};

       span:not(:first-of-type) {
        color: ${TEXT_COLORS.one};
      }
      `
    }

    if (Number(amount || 0) > 0) {
      return `
      background: rgb(2 39 32);
      border: 1px solid rgb(41 255 66 / 49%);
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;

      span:not(:first-of-type) {
        color: #55ffa3;
      }
      `
    }

    if (Number(amount || 0) < 0) {
      return `
      background: rgb(61 3 21);
      border: 1px solid rgb(255 41 106 / 49%);
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;

      span:not(:first-of-type) {
        color: #ff558a;
      }
      `
    }

    return `
      background: transparent;
      border-top: none;

      span:not(:first-of-type) {
        color: ${TEXT_COLORS.one};
      }
    `
  }}
`

export const StatColumn = styled(StatRow)`
  width: 50%;
  justify-content: flex-start;

  > img {
    border-radius: 50%;
    border: 2px solid ${BORDER_COLORS.one};
    padding: ${SPACING.xxs}px;
    width: 14px;
    height: 14px;
  }

  > div {
    display: flex;
    flex-direction: column;

    > span {
      text-transform: uppercase;

      // Value
      &:last-of-type {
        color: ${TEXT_COLORS.two};
      }
    }
  }
`
