import { AnimatePresence, motion } from 'framer-motion'

import { HeaderWrapper, RewardsWrapper, StatColumn, StatRow, StatWrapper } from './style'
import { PNGS, SVGS } from '@/assets'
import { Spinner } from '../Spinner'
import { DisplayToolTip, FareTooltip } from '../Tooltip'
import CountUp from 'react-countup'
import { TEXT_COLORS } from '@/design'

const DiceResultDisplay = () => {
  const [isShowPanel, setShowPanel] = useState<boolean>()
  const [title, setTitle] = useState<string>('DICE - STATISTICS')

  return (
    <>
      <DisplayToolTip id="fare-tooltip" />
      <RewardsWrapper isShowPanel={isShowPanel}>
        <HeaderWrapper
          mode={'default'}
          onClick={() => setShowPanel(!isShowPanel)}
          isShowPanel={isShowPanel}
        >
          <div>
            <Spinner mode={'dice'} />
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
                {/* <FareTooltip
                  className="mint-amount"
                  place="left"
                  content="The amount of FARE you minted as a result of your entry."
                >
                  <StatRow>
                    <p>
                      <img src={SVGS.crossIcon} alt="mint" /> <span>Multiplier</span>
                    </p>
                    <CountUp end={100} duration={3} suffix={' X'} separator={','} />
                  </StatRow>
                </FareTooltip>
                <FareTooltip
                  className="bet-amount"
                  place="left"
                  content="The amount of FARE you deployed in the entry. This FARE is burned."
                >
                  <StatRow>
                    <p>
                      <img src={SVGS.betIcon} alt="bet" />
                      <span>Win Chance</span>
                    </p>
                    <CountUp end={100} duration={3} suffix={' %'} separator={','} />
                  </StatRow>
                </FareTooltip> */}
                <StatColumn>
                  <img src={SVGS.crossIcon} alt="bet" />
                  <div>
                    <span>Multiplier</span>
                    <span style={{ color: TEXT_COLORS.two }}>0.00x</span>
                  </div>
                </StatColumn>
                <StatColumn>
                  <img src={SVGS.betIcon} alt="bet" />
                  <div>
                    <span>Win Chance</span>
                    <span style={{ color: TEXT_COLORS.two }}>0.00%</span>
                  </div>
                </StatColumn>
              </StatWrapper>
            </motion.div>
          )}
        </AnimatePresence>
        {/* <StatFooter isShowPanel={isShowPanel}>
          <StatColumn>
            <img src={SVGS.crossIcon} alt="bet" />
            <div>
              <span>Multiplier</span>
              <span style={{ color: TEXT_COLORS.two }}>0.00x</span>
            </div>
          </StatColumn>
          <StatColumn>
            <img src={SVGS.betIcon} alt="bet" />
            <div>
              <span>Win Chance</span>
              <span style={{ color: TEXT_COLORS.two }}>0.00%</span>
            </div>
          </StatColumn>
        </StatFooter> */}
      </RewardsWrapper>
    </>
  )
}

export default DiceResultDisplay
