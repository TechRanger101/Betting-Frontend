import WheelSvg from './WheelSvg'

const SWheel = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  height: 100%;
`

const SWheelSvgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: center;
  height: 100%;
  width: 100%;
`

const Wheel = () => {
  return (
    <SWheel>
      <SWheelSvgWrapper>
        <WheelSvg />
      </SWheelSvgWrapper>
    </SWheel>
  )
}

export default Wheel
