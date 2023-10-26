import numeral from 'numeral'
import shallow from 'zustand/shallow'
import { type Variants } from 'framer-motion'

import { type GameModeNumber } from '@/components/Wheel/types'
import { ModeButton } from '@/components/shared/Button/style'
import { getWheelColor } from '@/utils/spin'
import { type EntryQueueItem } from '@/store/types'
import useWheelStore from '@/store/useWheelStore'
import { PNGS, SVGS } from '@/assets'
import { SPACING } from '@/design/spacing'

import { BACKGROUND_COLORS, BORDER_COLORS, TEXT_COLORS } from '@/design'
import { BetCard } from '../style'

export const Indicator = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  margin: auto 0;
  margin-left: ${SPACING.md}px;

  ${({ color }) => css`
    border: 1px solid ${color};
    box-shadow: inset 0px 0px 10px ${color};
  `}
`

export const GameModeTag = styled.div`
  height: 18px;
  width: 40px;
  border-radius: 6px;
  background: transparent;
  color: ${TEXT_COLORS.one};
  transition: 0.2s all ease-in-out;
  cursor: pointer;
  background: ${BACKGROUND_COLORS.one};
  border: 1px solid ${BORDER_COLORS.one};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DetailsColumn = styled.div`
  width: 100%;
  justify-content: space-between;
  position: relative;

  > * {
    margin: auto 0;
  }

  > div > img {
    margin-right: ${SPACING.xs}px;
    width: 12px;
  }
`

export const ActionColumn = styled.div`
  height: 12px;
  width: 12px;
  filter: invert(1);
  margin: auto;
  margin-right: 0;

  img {
    cursor: pointer;
  }
`

interface IActiveBetItem {
  entry: EntryQueueItem
  setSelectedGameMode: (gameModeId: GameModeNumber) => void
  isActive: boolean
  txHash: string
  variants: Variants
}

const SubmittedBetItem = ({
  entry: { contractModeId, amount, pickedNumber = 0 },
  setSelectedGameMode,
  isActive,
  txHash,
  ...props
}: IActiveBetItem) => {
  const selectedTickId = useWheelStore(state => state.spinTickId, shallow)
  const color = useMemo(
    () => getWheelColor(contractModeId, pickedNumber),
    [contractModeId, pickedNumber]
  )
  const onClick = useCallback(() => window.open(`https://etherscan.io/tx/${txHash}`), [txHash])
  const currentLandedColor = useMemo(
    () => getWheelColor(contractModeId, selectedTickId),
    [contractModeId, selectedTickId]
  )
  const doesMatch = useMemo(() => currentLandedColor === color, [currentLandedColor, color])

  const onClickGameMode = useCallback(
    () => setSelectedGameMode(contractModeId),
    [setSelectedGameMode, contractModeId]
  )

  return (
    <BetCard
      color={color}
      doesMatch={doesMatch}
      isActive={isActive}
      {...props}
      style={{ position: 'relative' }}
    >
      <DetailsColumn>
        <div>
          {/* <p>#{idx + 1}</p> */}
          <ModeButton onClick={onClickGameMode}>{contractModeId + 'X'}</ModeButton>
        </div>
        <div>
          <p>{numeral(amount).format('0,0')}</p>
          <img src={SVGS.fareIcon} width={20} />
        </div>
      </DetailsColumn>
      <ActionColumn onClick={onClick}>
        <img src={PNGS.linkIcon} alt="Tx Link" />
      </ActionColumn>
    </BetCard>
  )
}

export default SubmittedBetItem
