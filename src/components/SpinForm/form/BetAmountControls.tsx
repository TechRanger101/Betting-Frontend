const SBetAmountControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

interface IBetAmountControlsProps {
  onHalfAmount?: () => void
  onTwoTimesAmount?: () => void
  onMaxAmount?: () => void
}

const BetAmountControls = ({ onHalfAmount, onTwoTimesAmount }: IBetAmountControlsProps) => {
  return (
    <SBetAmountControls>
      {onHalfAmount && <button onClick={onHalfAmount}>1/2</button>}
      {onTwoTimesAmount && <button onClick={onTwoTimesAmount}>2x</button>}
    </SBetAmountControls>
  )
}

export default BetAmountControls
