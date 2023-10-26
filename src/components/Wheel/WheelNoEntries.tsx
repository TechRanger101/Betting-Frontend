import { motion } from 'framer-motion'
import { SPACING } from '@/design'
import { wheelNoEntriesVariants } from './animation'

const SWheelNoEntries = styled(motion.div)`
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
  animation-delay: 1.5s;
`

const SWheelNoEntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const SNoEntriesTitle = styled.div`
  margin-bottom: ${SPACING.xs}px;
  position: relative;

  > span.loading-dots {
    position: absolute;
  }
`

const WheelContent = () => {
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const timer = setInterval(() => {
      if (dots.length < 3) {
        setDots(dots + '.')
      } else {
        setDots('.')
      }
    }, 600)

    return () => {
      clearInterval(timer)
    }
  }, [dots])

  return (
    <SWheelNoEntries
      variants={wheelNoEntriesVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <SWheelNoEntriesWrapper>
        {/* <SNoEntriesTitle>Waiting for entry to start countdown...</SNoEntriesTitle> */}
        <SNoEntriesTitle>Waiting for initial entry</SNoEntriesTitle>
        <SNoEntriesTitle>
          to begin countdown<span className="loading-dots">{dots}</span>
        </SNoEntriesTitle>
      </SWheelNoEntriesWrapper>
    </SWheelNoEntries>
  )
}

export default WheelContent
