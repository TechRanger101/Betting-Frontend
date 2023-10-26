import { motion } from 'framer-motion'
import { FONT_STYLES } from '@/design'
import { FARE_COLORS, TEXT_COLORS } from '../../../design/colors'
import { fade, floatingContainer } from '../../../design/css'
import { BREAKPOINTS, SPACING } from '../../../design/spacing'

export const DirectoryWrapper = styled.div`
  align-self: center;
  grid-column: span 1;
  margin: ${SPACING.md}px;
  margin-right: 0;
  height: inherit;
  display: grid;
`

export const FloatingDirectory = styled(motion.div)`
  ${floatingContainer}
  max-height: 100%;
  margin: auto;
  border-radius: 6px;

  @media only screen and (max-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`

export const LinkWrapper = styled(Link)<{ $isActive?: boolean; $mode?: string; $delay?: number }>`
  margin: auto;
  text-align: center;
  padding: ${SPACING.sm}px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  text-transform: uppercase;
  opacity: 0;
  border: 1px solid transparent;
  
  transition: 0.2s all ease-in-out;
  animation: 1s ${fade} forwards;
  animation-delay: ${({ $delay }) => $delay}s;

  p {
    margin: 0;
    margin-top: ${SPACING.xxs}px;
    color: ${({ $isActive }) => ($isActive ? TEXT_COLORS.one : TEXT_COLORS.two)};
    ${FONT_STYLES.xs}
  }

  img {
    height: 30px;
    width: 30px;
    margin: auto;
  }

  transition: 0.12s all ease-in-out;

  ${({ $isActive, $mode }) => {
    if ($isActive) {
      return `
        background: linear-gradient(45deg, ${FARE_COLORS.blue}25, ${FARE_COLORS.pink}25);
        border: 1px solid ${FARE_COLORS.pink}65;
      `
      if ($mode === 'dice') {
        return `
        background: #960a4f25;
        box-shadow: inset 0px 0px 5px 0px #ff51b5;
      `
      } else if ($mode === 'plinko') {
        return `
        background: #7725eb25;
        box-shadow: inset 0px 0px 5px 0px #7725eb;
      `
      } else if ($mode === 'bombs') {
        return `
        background: #a37c0725;
        box-shadow: inset 0px 0px 5px 0px #ffe800;
      `
      } else if ($mode === 'spin') {
        return `
        background: #072a6125;
        box-shadow: inset 0px 0px 5px 0px #2a84ff;
      `
      } else if ($mode === 'slots') {
        return `
        background: #01894025;
        box-shadow: inset 0px 0px 5px 0px #00ff69;
        `
      }

      return css`
        box-shadow: inset 0px 0px 5px 0px #ffffff;
      `
    }
  }}}

  &:hover {
    transition: 0.2s all ease-in-out;
    ${({ $isActive, $mode }) => {
      if (!$isActive) {
        return `
        background: linear-gradient(45deg, ${FARE_COLORS.blue}25, ${FARE_COLORS.pink}25);
        border: 1px solid ${FARE_COLORS.pink}65;
      `
        if ($mode === 'dice') {
          return `
          background: #960a4f25;
          box-shadow: inset 0px 0px 10px 0px #ff51b5;
        `
        } else if ($mode === 'plinko') {
          return `
          background: #7725eb25;
          box-shadow: inset 0px 0px 5px 0px #7725eb;
        `
        } else if ($mode === 'bombs') {
          return `
          background: #a37c0725;
          box-shadow: inset 0px 0px 10px 0px #ffe800;
        `
        } else if ($mode === 'spin') {
          return `
          background: #072a6125;
          box-shadow: inset 0px 0px 10px 0px #2a84ff;
        `
        } else if ($mode === 'slots') {
          return `
          background: #01894025;
          box-shadow: inset 0px 0px 10px 0px #00ff69;
          `
        }

        return css`
          background: #ffffff05;
          box-shadow: inset 0px 0px 10px 0px #ffffff;
        `
      }
    }}}

`

export const ExternalLinkWrapper = styled.div<{ $delay: number }>`
  margin: auto;
  text-align: center;
  padding: ${SPACING.sm}px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  opacity: 0;

  transition: 0.2s all ease-in-out;
  animation: 1s ${fade} forwards;
  animation-delay: ${({ $delay }) => $delay}s;

  &:hover {
    transition: 0.2s all ease-in-out;
    background: #ffffff05;
    box-shadow: inset 0px 0px 10px 0px #ffffff;

    p {
      color: ${TEXT_COLORS.one};
    }
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
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  overflow: hidden;
`

export const BottomDirectory = styled.div`
  margin-top: 100px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow: hidden;
`
