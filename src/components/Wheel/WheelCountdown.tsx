import { wheelLoaderVariants } from './animation'
import { CountdownNumber, CountdownTitle, SCountdownWrapper, SWheelCountdown } from './styles'

export interface IWheelContentProps {
  countdown: number
  countdownTotal: number
}

const WheelCountdown = ({ countdown }: IWheelContentProps) => {
  return (
    <SWheelCountdown variants={wheelLoaderVariants} initial="initial" animate="animate" exit="exit">
      <SCountdownWrapper>
        <CountdownTitle>NEXT ROUND IN:</CountdownTitle>
        <CountdownNumber>{countdown}</CountdownNumber>
      </SCountdownWrapper>
    </SWheelCountdown>
  )
}

export default WheelCountdown
