import { motion } from 'framer-motion'
import styled from 'styled-components'
import { BACKGROUND_COLORS, BORDER_COLORS, TEXT_COLORS } from '@/design/colors'
import { COMPONENTS } from '@/design/components'
import { FONT_STYLES } from '@/design/fonts'
import { SPACING } from '@/design/spacing'

export const ToastListWrapper = styled.div`
  z-index: 1000;
  position: absolute;
  overflow-y: auto;
  top: ${COMPONENTS.header + SPACING.md}px;
  right: ${SPACING.md}px;
`

export const ToastWrapper = styled(motion.div)`
  border: 1px solid ${BORDER_COLORS.one}};
  margin-bottom: ${SPACING.md}px;
  width: 320px;
  backdrop-filter: blur(16px) brightness(0.85);
  border-radius: 6px;
  position: relative;

  p {
    margin-left: ${SPACING.sm}px;
    text-transform: uppercase;
  }
`

const bar = keyframes`
  from {
    width: 100%
  }

  to {
    width: 0%
  }
`

export const ToastIntervalBar = styled.div<{
  interval?: number
  type?: 'default' | 'success' | 'error'
}>`
  ${({ interval }) =>
    interval &&
    css`
      position: absolute;
      bottom: -2px;
      left: 0;
      height: 2px;
      animation: ${interval / 1000}s ${bar};
    `}

  background-color: ${({ type }) => {
    if (type === 'success') return '#27ff83'
    if (type === 'error') return '#ff2763'
  }}
`

export const ToastInfoWrapper = styled.div`
  padding-top: ${SPACING.md}px;
  border-top: 1px solid ${BORDER_COLORS.one};
  padding: ${SPACING.md}px;
  ${FONT_STYLES.xs}

  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: auto 0;

    &:not(:last-child) {
      margin-bottom: ${SPACING.sm}px;
    }
  }
`

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;

  > img {
    width: 12px;
    height: 12px;
    filter: grayscale(1);
  }
`

export const StatLabel = styled.span`
  color: ${TEXT_COLORS.two};
  ${FONT_STYLES.xs}
`

export const StatValue = styled.span``

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto 0;
  ${FONT_STYLES.xs}
  position: relative;
  padding: ${SPACING.md}px;
  border-bottom: 2px solid ${BORDER_COLORS.one};

  p {
    margin: 0;
  }
`

export const SubheaderWrapper = styled.div`
  ${FONT_STYLES.xs}
  color: ${TEXT_COLORS.two};
  padding: ${SPACING.md}px;
`

export const Title = styled.div`
  display: flex;

  p {
    margin-left: ${SPACING.sm}px;
  }
`
