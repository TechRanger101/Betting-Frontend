import { motion } from 'framer-motion'
import { SPACING } from '@/design/spacing'

export const PageWrapper = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  box-sizing: border-box;
`

export const FloatingContainer = styled(motion.div)`
  margin: auto;
  display: grid;
  gap: ${SPACING.md}px;
  border-radius: 6px;

  // SPIN
  grid-template-rows: 1fr;
  grid-template-columns: 4fr 2fr;

  max-width: 1200px;
  min-width: 900px;
  height: calc(100% - ${SPACING.md * 2}px);
  max-height: 1000px;
`

export const GamePageSpinner = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;

  > * {
    width: fit-content;
  }
`
