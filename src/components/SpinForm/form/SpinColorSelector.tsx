import type { GameModeNumber } from '../../Wheel/types'
import { WHEEL_COLORS } from '@/design/colors'
import useWheelTick from '@/hooks/useWheelTick'
import { SColorPicker, SColorBoxImproved } from '../style'

interface IColorChoiceButton {
  color: string
  idx: number
  notClickable?: boolean
}

export const ColorChoiceButton = memo(({ color, idx, notClickable }: IColorChoiceButton) => {
  const { onHover, onHoverLeave, onToggleSelect, isTickSelected, isLimitReached, existsInQueue } =
    useWheelTick(color, idx)

  const classNames = useMemo(() => {
    let classes = ''
    if (isLimitReached) classes += 'isDisabled '
    if (existsInQueue) classes += 'isInQueue '
    if (isTickSelected) {
      classes += 'isActive '
      if (!existsInQueue) classes += 'isInQueueDisabled '
    }
    if (notClickable) classes += 'isNotClickable '
    return classes.trim()
  }, [isLimitReached, existsInQueue, isTickSelected, notClickable])

  return (
    <SColorBoxImproved
      // isDisabled={isLimitReached}
      // isInQueue={existsInQueue}
      // isActive={isTickSelected}
      // notClickable={notClickable}
      // color={color}
      className={classNames}
      key={`${color}${idx}`}
      boxColor={color}
      data-disabled={notClickable ? 'true' : undefined}
      // disabled={notClickable}
      onMouseOver={onHover}
      onClick={onToggleSelect}
      onMouseLeave={onHoverLeave}
    />
  )
})

interface ISpinColorSelector {
  selectedGameMode: GameModeNumber
  notClickable?: boolean
}

const SpinColorSelector = ({ selectedGameMode, notClickable }: ISpinColorSelector) => {
  const selectedColorChoices = useMemo(() => {
    return WHEEL_COLORS[selectedGameMode].map((color, idx) => (
      <ColorChoiceButton key={color} color={color} idx={idx} notClickable={notClickable} />
    ))
  }, [selectedGameMode, notClickable])

  return <SColorPicker>{selectedColorChoices}</SColorPicker>
}

export default SpinColorSelector
