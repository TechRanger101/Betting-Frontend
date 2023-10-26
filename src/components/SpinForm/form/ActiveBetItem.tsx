import { type MotionProps } from 'framer-motion'
import numeral from 'numeral'
import { getWheelColor } from '@/utils/spin'
import { SVGS } from '@/assets'
import { type EntryQueueItem } from '@/store/types'
import { type GameModeNumber } from '@/components/Wheel/types'
import { ModeButton } from '@/components/shared/Button/style'
import { ActionColumn, DetailsColumn, BetCard } from '../style'

interface IActiveBetItem {
  entry: EntryQueueItem
  onRemove: (entryId: string) => void
  setSelectedGameMode: (gameModeId: GameModeNumber) => void
  isActive: boolean
  key: string
}

const ActiveBetItem = forwardRef<HTMLDivElement, IActiveBetItem & MotionProps>(
  (
    {
      entry: { entryId, contractModeId, amount, pickedNumber = 0 },
      onRemove,
      setSelectedGameMode,
      isActive,
      ...props
    },
    ref
  ) => {
    const color = useMemo(
      () => getWheelColor(contractModeId, pickedNumber),
      [contractModeId, pickedNumber]
    )
    const onClick = useCallback(() => onRemove(entryId), [onRemove, entryId])

    const onClickGameMode = useCallback(
      () => setSelectedGameMode(contractModeId),
      [setSelectedGameMode, contractModeId]
    )

    return (
      <BetCard
        ref={ref}
        color={color}
        doesMatch={true}
        isActive={isActive}
        {...props}
        style={{ position: 'relative' }}
      >
        <DetailsColumn>
          <div>
            <ModeButton onClick={onClickGameMode}>{contractModeId + 'X'}</ModeButton>
          </div>
          <div>
            <p>{numeral(amount).format('0,0')}</p>
            <img src={SVGS.fareIcon} width={20} alt="FARE" />
          </div>
        </DetailsColumn>
        <ActionColumn onClick={onClick}>
          <img src={SVGS.trashIcon} alt="Remove" />
        </ActionColumn>
      </BetCard>
    )
  }
)

export default ActiveBetItem
