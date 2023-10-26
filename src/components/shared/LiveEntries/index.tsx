import numeral from 'numeral'
import shallow from 'zustand/shallow'
import { AnimatePresence, motion } from 'framer-motion'

import { SColorBox } from '@/components/SpinForm/style'
import { Avatar as AvatarWrapper } from '@/components/shared/Chat/style'
import Avatar from '@/components/shared/Avatar'
import { type GameModeNumber } from '@/components/Wheel/types'
import { ModeButton } from '@/components/shared/Button/style'
import { FONT_STYLES } from '@/design'
import { floatingContainer } from '@/design/css'
import { TEXT_COLORS } from '@/design/colors'
import { BREAKPOINTS, SPACING } from '@/design/spacing'
import { shortenAddress } from '@/utils/text'
import { type IBatchEntry } from '@/lib/ws/types/spinRoom'
import useSpinStore from '@/store/useSpinStore'
import useScreenSize from '@/hooks/useScreenSize'
import { PNGS, SVGS } from '@/assets'

export const LiveEntriesWrapper = styled.div`
  overflow: scroll;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  flex-grow: 1;
  box-sizing: border-box;
  ${floatingContainer}

  @media only screen and (max-width: ${BREAKPOINTS.lg}px) {
    grid-column: 1 / span 5;
  }
`

export const EntriesStatWrapper = styled.div`
  display: block;
  margin-top: ${SPACING.sm}px;

  > * {
    margin: auto 0;
  }

  div {
    display: flex;
  }

  p {
    margin: 0;
    margin-left: ${SPACING.xs}px;
  }

  ${SColorBox} {
    min-width: 32px;
    margin-right: ${SPACING.xxs}px;
    ${FONT_STYLES.xs}
    &:last-child {
      margin-right: 0px;
    }
  }
`

export const BetList = styled(motion.div)`
  width: 100%;
  position: relative;

  td {
    margin: auto 0;
  }
`

export const BetHeader = styled.thead<{ isMinified?: boolean }>`
  > tr {
    display: grid;
    grid-template-columns: ${({ isMinified }) =>
      isMinified ? 'repeat(5, 1fr)' : '3fr 1fr 2fr 2fr 1fr'};
    padding: ${SPACING.xs}px ${SPACING.sm}px;
    text-transform: uppercase;
    ${FONT_STYLES.xs}
    text-align: left;
    color: ${TEXT_COLORS.two};

    th:last-of-type {
      text-align: right;
      grid-template-columns: 3fr 4fr 2fr 1fr;

      > th {
        padding: ${SPACING.xs}px ${SPACING.sm}px;
        text-transform: uppercase;
        ${FONT_STYLES.xs}
        text-align: left;
        color: ${TEXT_COLORS.two};

        &:last-of-type {
          text-align: right;
        }
      }
    }
  }
`

export const BetRow = styled(motion.tr)<{ isMinified?: boolean }>`
  display: grid;
  grid-template-columns: ${({ isMinified }) =>
    isMinified ? 'repeat(5, 1fr)' : '3fr 1fr 2fr 2fr 1fr'};
  justify-content: space-between;
  padding: ${SPACING.xs}px 0;
  border-radius: 6px;
  border-top: 1px solid #222;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  > div {
    display: flex;
    margin: auto 0;
  }

  > td:first-of-type,
  > td:last-of-type {
    padding: 0 ${SPACING.sm}px;
  }
`

export const LiveEntryRow = styled(motion.div)`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  &:last-child {
    border-bottom: none;
  }
  > div {
    flex: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .sm-le-col {
    flex: 1;
  }
`

export const BetLinkWrapper = styled.div`
  /* text-align: right; */
`

export const BetLink = styled.a`
  display: inline-flex;
  margin: auto 0;

  img {
    /* margin-left: ${SPACING.md}px; */
    filter: invert();
    width: 10px;
    height: 10px;
  }
`

export const BetAmountWrapper = styled.div`
  display: flex;
  text-align: right;
  width: 92px;

  img {
    margin-right: ${SPACING.xs}px;
  }
`

enum ModeEnum {
  TWOX = '2X',
  TENX = '10X',
  HUNDREDX = '100X',
}

interface ILiveEntry {
  address: string
  username?: string
  txHash: string
  mode: ModeEnum
  selectedColors: number[]
  fareAmount: number
  gmId: GameModeNumber
}

type EntryBreakdown = {
  count: number
  totalFare: number
  list: ILiveEntry[]
}

class LiveEntry implements ILiveEntry {
  public fareAmount = 0
  public selectedColors: number[] = []
  address: string
  username?: string
  txHash: string
  mode: ModeEnum
  gmId: GameModeNumber

  constructor(mode: ModeEnum, be: IBatchEntry, gmId: GameModeNumber) {
    this.txHash = be.placedTxHash
    this.address = be.player
    this.username = be.username
    this.mode = mode
    this.gmId = gmId
  }
}

const createEntryMap = (be: IBatchEntry) => [
  new LiveEntry(ModeEnum.TWOX, be, 2),
  new LiveEntry(ModeEnum.TENX, be, 10),
  new LiveEntry(ModeEnum.HUNDREDX, be, 100),
]

const LiveEntryHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 8px;
  padding-bottom: 6px;
  position: sticky;
  width: 100%;
  top: 0px;
  background: black;
  z-index: 200;

  > .live-entry-header {
    flex: 2;
    text-align: center;
    text-transform: uppercase;
    line-height: 16px;
    font-size: 12px;
    font-weight: bold;
    &.le-sm {
      flex: 1;
    }
    &.le-addr-align {
      > span {
        position: absolute;
        left: 70px;
      }
    }
  }
`

const LiveEntries = () => {
  const { batchEntries } = useSpinStore(
    state => ({
      batchEntries: state.batchEntries,
      round: state.round,
      prevRounds: state.prevRounds,
      currentRoundId: state.currentRoundId,
    }),
    shallow
  )

  const entryBreakdown = useMemo(() => {
    const batchEntryValues = Array(...batchEntries.values()).reverse()
    const entryBreakdown: EntryBreakdown = {
      count: 0,
      totalFare: 0,
      list: [],
    }

    batchEntryValues.forEach(be => {
      // const entryMap = createEntryMap(be)
      const entryRecord = new LiveEntry(ModeEnum.TWOX, be, 2)

      be.entries.forEach(entry => {
        // const liveEntry = entryMap[entry.contractModeId]
        // liveEntry.selectedColors.push(entry.pickedNumber)
        entryRecord.fareAmount += Number(entry.amount)
        entryRecord.selectedColors.push(entry.pickedNumber)
        entryBreakdown.totalFare += Number(entry.amount)
      })

      // entryBreakdown.list.push(...entryMap.filter(le => le.fareAmount > 0))
      entryBreakdown.list.push(entryRecord)
    })

    entryBreakdown.count = entryBreakdown.list.length
    // entryBreakdown.count = batchEntryValues.length
    // return entryBreakdown
    return entryBreakdown.list
  }, [batchEntries])

  const { width } = useScreenSize()

  const isMinifiedScreen = useCallback(() => width < BREAKPOINTS.md, [width])

  // const liveEntryElems = useMemo(() => {
  //   return entryBreakdown.list.map((liveEntry, idx) => (
  //     <BetRow
  //       // isMinified={isMinifiedScreen()}
  //       key={`${liveEntry.address}-${idx}`}
  //       layoutId={String(idx)}
  //       transition={{
  //         duration: 1,
  //       }}
  //       initial={{
  //         opacity: 0,
  //         transform: 'translateY(50px)',
  //       }}
  //       animate={{
  //         opacity: 1,
  //         transform: 'translateY(0px)',
  //       }}
  //       exit={{
  //         opacity: 0,
  //         transform: 'translateY(50px)',
  //       }}
  //     >
  //       <td>
  //         <AvatarWrapper style={{ margin: 'auto 0' }}>
  //           <Avatar seed={liveEntry.address} />{' '}
  //           {!isMinifiedScreen() ? (
  //             <p>{liveEntry.username || shortenAddress(liveEntry.address || '')}</p>
  //           ) : null}
  //         </AvatarWrapper>
  //       </td>
  //       <BetAmountWrapper>
  //         <img src={SVGS.fareIcon} width={20} />
  //         <p>{numeral(liveEntry.fareAmount).format('0,0.00')}</p>
  //       </BetAmountWrapper>
  //       <BetLinkWrapper>
  //         <BetLink href="">
  //           <img src={PNGS.linkIcon} alt="tx-link" />
  //         </BetLink>
  //       </BetLinkWrapper>
  //     </BetRow>
  //   ))
  // }, [entryBreakdown.list, isMinifiedScreen])

  const liveEntryElems = useMemo(() => {
    return entryBreakdown.map((liveEntry, idx) => (
      <LiveEntryRow
        // isMinified={isMinifiedScreen()}
        key={`${liveEntry.txHash}`}
        layoutId={liveEntry.txHash}
        // transition={{
        //   duration: 1,
        // }}
        initial={{
          opacity: 0,
          // transform: 'translateY(50px)',
        }}
        animate={{
          opacity: 1,
          // transform: 'translateY(0px)',
        }}
        exit={
          {
            // opacity: 0,
            // transform: 'translateY(50px)',
          }
        }
      >
        <div>
          <AvatarWrapper style={{ margin: 'auto 0' }}>
            <Avatar seed={liveEntry.address} />{' '}
            {!isMinifiedScreen() ? (
              <p>{liveEntry.username || shortenAddress(liveEntry.address || '')}</p>
            ) : null}
          </AvatarWrapper>
        </div>
        <div>
          <BetAmountWrapper>
            <img src={SVGS.fareIcon} width={20} />
            <p>{numeral(liveEntry.fareAmount).format('0,0.00')}</p>
          </BetAmountWrapper>
        </div>
        <div className="sm-le-col">
          <img src={SVGS.spinIcon} width={20} />
        </div>
        <div className="sm-le-col">
          <BetLinkWrapper>
            <BetLink href="">
              <img src={PNGS.linkIcon} alt="tx-link" />
            </BetLink>
          </BetLinkWrapper>
        </div>
      </LiveEntryRow>
    ))
  }, [entryBreakdown, isMinifiedScreen])

  return (
    <LiveEntriesWrapper>
      <BetList>
        <LiveEntryHeader>
          <div className="live-entry-header le-addr-align">
            <span>User</span>
          </div>
          <div className="live-entry-header">Entry</div>
          <div className="live-entry-header le-sm">Game</div>
          <div className="live-entry-header le-sm">TX</div>
        </LiveEntryHeader>
        {/* <BetHeader isMinified={isMinifiedScreen()}> */}
        {/*   <tr> */}
        {/*     <th>Address</th> */}
        {/*     <th>Bet Amount</th> */}
        {/*     <th>Tx</th> */}
        {/*   </tr> */}
        {/* </BetHeader> */}
        <AnimatePresence>
          <motion.div>{liveEntryElems}</motion.div>
        </AnimatePresence>
      </BetList>
    </LiveEntriesWrapper>
  )
}

export default LiveEntries
