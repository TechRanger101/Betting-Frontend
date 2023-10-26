import CountUp from 'react-countup'
import shallow from 'zustand/shallow'
import { AnimatePresence, motion } from 'framer-motion'

import { HeaderWrapper, RewardsWrapper, StatFooter, StatRow, StatWrapper } from './style'
import useSpinStore from '@/store/useSpinStore'
import { PNGS, SVGS } from '@/assets'

import { Spinner } from '../Spinner'
import { DisplayToolTip, FareTooltip } from '../Tooltip'

type ResultMode = 'default' | 'win' | 'lose'

interface IConfig {
  mode: ResultMode
  countdownDuration: number
  amount: number
  mintAmount: number
  burnAmount: number
  betAmount: number
  deltaPercent: number
}

const SpinResultDisplay = () => {
  const { prevSubmittedEntries, mySubmittedEntries, roomStatus, currentRoundId } = useSpinStore(
    state => ({
      prevSubmittedEntries: state.prevSubmittedEntries,
      mySubmittedEntries: state.mySubmittedEntries,
      roomStatus: state.roomStatus,
      currentRoundId: state.currentRoundId,
    }),
    shallow
  )
  const [isShowPanel, setShowPanel] = useState<boolean>()

  const [title, setTitle] = useState<string>('FETCHING...')

  const resultContent: IConfig = useMemo(() => {
    let deltaAmount = 0

    if (mySubmittedEntries && roomStatus !== 'finished') {
      // setTitle(`ROUND ${currentRoundId + 1} IN PROGRESS`)
      setTitle(`ROUND IN PROGRESS`)
      return {
        mode: 'default',
        mintAmount: 0,
        burnAmount: 0,
        amount: 0,
        betAmount: Number(mySubmittedEntries.totalEntryAmount),
        countdownDuration: 2,
        deltaPercent: 0,
      }
    }

    if (roomStatus === 'waiting-for-first-entry') {
      setTitle('WAITING FOR ENTRY...')
    }

    if (roomStatus === 'spinning') {
      setTitle('ROUND IN PROGRESS')
    }

    if (roomStatus === 'finished') {
      setTitle(`ROUND RESULTS`)
    }

    if (prevSubmittedEntries) {
      deltaAmount =
        Number(prevSubmittedEntries?.totalMintAmount) -
        Number(prevSubmittedEntries?.totalEntryAmount)
    }

    let resultConfig: Partial<IConfig> = {
      mode: 'default',
      mintAmount: 0,
      burnAmount: 0,
      amount: 0,
      betAmount: 0,
      countdownDuration: 2,
      deltaPercent: 0,
    }

    if (!mySubmittedEntries && !prevSubmittedEntries) {
      return {
        mode: 'default',
        mintAmount: 0,
        burnAmount: 0,
        amount: 0,
        betAmount: 0,
        countdownDuration: 2,
        deltaPercent: 0,
      }
    }

    resultConfig = {
      mode: deltaAmount >= 0 ? 'win' : 'lose',
      mintAmount: Number(prevSubmittedEntries?.totalMintAmount),
      burnAmount: Number(prevSubmittedEntries?.totalEntryAmount),
      amount:
        Number(prevSubmittedEntries?.totalMintAmount) -
        Number(prevSubmittedEntries?.totalEntryAmount),
      betAmount: Number(prevSubmittedEntries?.totalEntryAmount),
      countdownDuration: 2,
    } as IConfig

    const rawPercent =
      ((resultConfig.mintAmount || 0) - (resultConfig.burnAmount || 0)) /
      (resultConfig.burnAmount || 0)
    resultConfig.deltaPercent = Math.round((rawPercent + Number.EPSILON) * 10000) / 100 || 0

    return resultConfig as IConfig
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevSubmittedEntries, mySubmittedEntries, roomStatus, currentRoundId])

  const percentFormatFn = useCallback(
    (percent: number) => ` (${percent}%)`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resultContent.deltaPercent]
  )

  return (
    <>
      <DisplayToolTip id="fare-tooltip" />
      <RewardsWrapper isShowPanel={isShowPanel}>
        <HeaderWrapper
          mode={resultContent.mode}
          onClick={() => setShowPanel(!isShowPanel)}
          isShowPanel={isShowPanel}
        >
          <div>
            {/* <ToastSpinner mode={'lose'} /> */}
            <Spinner mode={resultContent.mode} />
            <AnimatePresence key={title}>
              <motion.div
                transition={{
                  duration: 1,
                  ease: 'easeInOut',
                }}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                <p>{title}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <img
            src={PNGS.chevronIcon}
            style={{
              transform: `rotate(${isShowPanel ? 180 : 0}deg)`,
              transition: '.2s ease-in-out',
            }}
          />
        </HeaderWrapper>

        <AnimatePresence>
          {isShowPanel && (
            <motion.div
              style={{ overflow: 'hidden' }}
              key={String(isShowPanel)}
              transition={{
                duration: 0.25,
                ease: 'easeIn',
              }}
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: 'auto',
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
            >
              <StatWrapper>
                {resultContent.mode === 'win' && (
                  <FareTooltip
                    className="mint-amount"
                    place="left"
                    content="The amount of FARE you minted as a result of your entry."
                  >
                    <StatRow>
                      <p>
                        <img src={SVGS.mintIcon} alt="mint" /> <span>Mint Amount</span>
                      </p>
                      <CountUp
                        end={resultContent.mintAmount}
                        duration={resultContent.countdownDuration}
                        suffix={' FARE'}
                        separator={','}
                      />
                    </StatRow>
                  </FareTooltip>
                )}
                {resultContent.mode === 'lose' && (
                  <FareTooltip
                    className="burn-amount"
                    place="left"
                    content="The amount of FARE you burned as a result of your entry."
                  >
                    <StatRow>
                      <p>
                        <img src={SVGS.burnIcon} alt="burn" /> <span>Burn Amount</span>
                      </p>
                      <CountUp
                        end={resultContent.burnAmount}
                        duration={resultContent.countdownDuration}
                        suffix={' FARE'}
                        separator={','}
                      />
                    </StatRow>
                  </FareTooltip>
                )}
                <FareTooltip
                  className="bet-amount"
                  place="right"
                  content="The amount of FARE you deployed in the entry. This FARE is burned."
                >
                  <StatRow>
                    <p>
                      <img src={SVGS.betIcon} alt="bet" />
                      <span>Entry Amount</span>
                    </p>
                    <CountUp
                      end={resultContent.betAmount}
                      duration={resultContent.countdownDuration}
                      suffix={' FARE'}
                      separator={','}
                    />
                  </StatRow>
                </FareTooltip>
              </StatWrapper>
            </motion.div>
          )}
        </AnimatePresence>
        <StatFooter
          amount={resultContent.amount}
          disabled={roomStatus !== 'finished'}
          isShowPanel={isShowPanel}
          // isShowPanel={resultContent.amount !== 0}
        >
          <FareTooltip
            className="result"
            place="bottom"
            content="The difference between your ENTRY AMOUNT and MINT/BURN AMOUNT for this round."
          >
            {resultContent.mode !== 'default' ? (
              <>
                <div className="stat-footer-mode">
                  {resultContent.mode === 'win' ? (
                    <div>
                      <img src={SVGS.mintIcon} alt="mint" />{' '}
                      <div className="stat-footer-mode-label">YOU GAINED</div>
                    </div>
                  ) : (
                    <div>
                      <img src={SVGS.burnIcon} alt="burn" />{' '}
                      <div className="stat-footer-mode-label">YOU LOST</div>
                    </div>
                  )}
                </div>
                <div>
                  <CountUp
                    end={resultContent.mode === 'win' ? resultContent.amount : resultContent.amount}
                    duration={resultContent.countdownDuration}
                    suffix={` FARE `}
                    separator={','}
                  />
                  <CountUp
                    formattingFn={percentFormatFn}
                    end={resultContent.deltaPercent}
                    duration={resultContent.countdownDuration}
                  />
                </div>
              </>
            ) : (
              <div>No results yet</div>
            )}
          </FareTooltip>
        </StatFooter>
      </RewardsWrapper>
    </>
  )
}

export default SpinResultDisplay
