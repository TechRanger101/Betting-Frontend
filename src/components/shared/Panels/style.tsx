import { motion } from 'framer-motion'
import { COMPONENTS, FONT_STYLES } from '@/design'
import { BREAKPOINTS, SPACING } from '../../../design/spacing'
import { BACKGROUND_COLORS, BORDER_COLORS, FARE_COLORS, TEXT_COLORS } from '../../../design/colors'
import { fade } from '../../../design/css'

export const RightPanelWrapper = styled(motion.div)`
  grid-template-rows: min-content 1fr;
  grid-column: 3 / span 1;
  flex-direction: column;
  width: ${COMPONENTS.rightPanel}px;
  height: inherit;
  display: grid;
  grid-gap: ${SPACING.md}px;
  margin: ${SPACING.md}px;
  margin-left: auto;

  @media only screen and (max-width: ${BREAKPOINTS.lg}px) {
    width: ${COMPONENTS.rightPanel - 40}px;
  }

  @media only screen and (max-width: ${BREAKPOINTS.md}px) {
    width: ${COMPONENTS.rightPanel - 60}px;
  }
`
export const ConnectWalletButtonWrapper = styled.div`
  padding: ${SPACING.sm}px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(8px) brightness(0.1);

  > button {
    width: 100%;
  }
`

export const DirectoryWrapper = styled.div`
  align-self: center;
  grid-column: span 1;
  margin: ${SPACING.md}px;
  margin-right: 0;
  height: inherit;
  display: grid;
  background: none;
`

export const FloatingDirectory = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 800px;
  background: transparent;
  backdrop-filter: none;
  margin: auto;
  border-radius: 6px;
  border: none;
  max-height: 100%;

  @media only screen and (max-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }

  @media only screen and (min-height: 1000px) {
    max-height: 800px;
  }
`

export const LinkWrapper = styled(Link)<{ $isActive?: boolean }>`
  margin: ${SPACING.sm}px auto;
  text-align: center;
  padding: ${SPACING.sm}px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  text-transform: uppercase;
  border: 1px solid ${BORDER_COLORS.one};
  border-radius: 4px;
  background: ${BACKGROUND_COLORS.two};
  transition: 0.2s all ease-in-out;
  
  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  p {
    margin: 0;
    margin-top: ${SPACING.xxs}px;
    color: ${({ $isActive }) => ($isActive ? TEXT_COLORS.one : TEXT_COLORS.two)};
    ${FONT_STYLES.xs}
  }

  img {
    transition: 0.2s all ease-in-out;
    height: 30px;
    width: 30px;
    margin: auto;
  }


  &:hover {
    transition: 0.2s all ease-in-out;
    border: 1px solid ${FARE_COLORS.blue}cc;
    background: ${FARE_COLORS.blue}20;
    
    p {
      color: ${TEXT_COLORS.one};
    }

    img {
      filter: none;
    }
  }

  ${({ $isActive }) => {
    if ($isActive) {
      return `
      background: ${FARE_COLORS.blue}20;
      border: 1px solid ${FARE_COLORS.blue};
      `
    }

    return `
    img {
      filter: brightness(0.4);
    }
    `
  }}}


`

export const ExternalLinkWrapper = styled.a<{ $delay: number }>`
  margin: ${SPACING.sm}px auto;
  text-align: center;
  padding: ${SPACING.sm}px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  text-transform: uppercase;
  border: 1px solid ${BORDER_COLORS.one};
  border-radius: 4px;
  background: ${BACKGROUND_COLORS.two};
  transition: 0.2s all ease-in-out;

  &:last-of-type {
    margin-bottom: 0;
  }

  &:hover {
    transition: 0.2s all ease-in-out;
    border: 1px solid ${FARE_COLORS.aqua}cc;
    background: ${FARE_COLORS.aqua}20;
  }

  img {
    height: 30px;
    width: 30px;
    margin: auto;
  }

  p {
    margin: 0;
    margin-top: ${SPACING.xxs}px;
    color: ${TEXT_COLORS.two};
    ${FONT_STYLES.xs}
  }
`

export const TopDirectory = styled.div`
  overflow: hidden;
`

export const BottomDirectory = styled.div`
  overflow: hidden;
`
