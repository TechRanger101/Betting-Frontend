import numeral from 'numeral'
import shallow from 'zustand/shallow'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrevious } from 'react-use'
import CountUp from 'react-countup'
import { type AxiosError } from 'axios'
import { RightPanelWrapper } from './style'
import useCryptoStore from '@/store/useCryptoStore'
import useSpinStore from '@/store/useSpinStore'
import useAuthStore from '@/store/useAuthStore'
import { COMPONENTS } from '@/design/components'
import { baseTxOverrides } from '@/constants/web3'
import { useToast } from '@/hooks/useToast'
import { PNGS, SVGS } from '@/assets'
import { FONT_STYLES } from '@/design'
import { BREAKPOINTS, SPACING } from '@/design/spacing'
import { floatingContainer } from '@/design/css'
import { BACKGROUND_COLORS, BORDER_COLORS, TEXT_COLORS } from '@/design/colors'
import { Chat } from '../Chat'

import { Button, ButtonEnum } from '../Button'

export const PanelContainer = styled(motion.div)`
  border-radius: 6px;
  overflow: hidden;
  ${floatingContainer};
  background: transparent !important;
`

export const BalanceWrapper = styled.div`
  border-radius: 6px;

  button {
    width: 100%;
  }
`

export const BlockHeader = styled.div<{ isShowPanel?: boolean }>`
  display: flex;
  padding: 0 ${SPACING.sm}px;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
  height: ${COMPONENTS.panelTabHeader}px;
  background: ${BACKGROUND_COLORS.two};

  ${({ isShowPanel }) => isShowPanel && `border-bottom: 1px solid ${BORDER_COLORS.one}`};

  > div {
    display: flex;
    align-items: center;
  }

  > * {
    margin: auto 0;
  }

  img {
    width: 20px;
    height: 20px;
  }

  > img:last-child {
    margin: auto 0;
    width: 16px;
    height: 16px;
    padding: 0;
    filter: invert();
  }

  &.block-full-width {
    width: 100%;
  }

  p,
  .balance-amount-display {
    margin-left: ${SPACING.sm}px;
    text-transform: uppercase;
    ${FONT_STYLES.md}
  }
`

export const BlockSubHeader = styled(BlockHeader)`
  background: none;
`

export const RewardsWrapper = styled.div`
  border-radius: 6px;
  padding: ${SPACING.sm}px;
  padding-top: 0px;

  button {
    width: 100%;
  }

  ${BlockHeader} {
    border: none;
    padding: 0;
    display: inline-flex;
  }
`

export const Block = styled.div<{ isFilled?: boolean }>`
  width: 100%;
  height: 4px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  margin: auto;

  ${({ isFilled }) =>
    isFilled &&
    `
    background: #27ff83;
    box-shadow: 0px 0px 6px #53ff0f;
  `}
`

export const BlockRow = styled.div<{ claimableCount: number }>`
  display: grid;
  padding-top: ${SPACING.xs}px;
  padding-bottom: ${SPACING.md}px;
  grid-template-columns: repeat(${props => props.claimableCount}, 1fr);
  grid-gap: ${SPACING.xxs}px;

  @media only screen and (max-width: ${BREAKPOINTS.lg}px) {
    grid-template-columns: repeat(10, 1fr);
    grid-gap: ${SPACING.xs}px;
  }

  ${Block} {
    &:first-of-type {
      padding-left: 0;
      margin-left: 0;
    }

    &:last-of-type {
      padding-right: 0;
      margin-right: 0;
    }
  }
`

export const ClaimableText = styled.div`
  display: flex;
  padding: ${SPACING.sm}px 0;
  justify-content: end;

  > * {
    color: ${TEXT_COLORS.two};
  }

  > * {
    margin: auto 0;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: ${SPACING.xs}px;
  }
`

export const Description = styled.p`
  color: ${TEXT_COLORS.two};
  margin-bottom: ${SPACING.md}px;
`

export const BalanceRow = styled.div`
  display: flex;
  padding: ${SPACING.sm}px ${SPACING.md}px;
  margin-right: ${SPACING.sm}px;

  img {
    margin: auto 0;
    height: 20px;
    width: 20px;
  }

  p,
  .balance-amount-display {
    margin: auto 0;
    margin-left: ${SPACING.sm}px;
  }
`

export const BalanceList = styled(motion.div)`
  border-left: 3px solid #ffffff1f;
  margin: ${SPACING.sm}px;
`

export const CollapsedWrapper = styled.div`
  display: flex;
  align-items: center;

  > img:last-of-type {
    margin-left: ${SPACING.md}px;
  }
`

export const RightPanel = () => {
  const [isFetchingBalance, setIsFetchingBalance] = useState<boolean>(false)
  const [isShowPanel, setShowPanel] = useState<boolean>(true)
  const { addToast } = useToast()

  const authPublicAddress = useAuthStore(state => state.authPublicAddress)
  const { ethBalance, fareBalance, fareSpinContract } = useCryptoStore(
    state => ({
      ethBalance: state.ethBalance,
      fareBalance: state.fareBalance,
      fareSpinContract: state.fareSpinContract,
    }),
    shallow
  )
  const prevFareBalance = usePrevious(fareBalance)
  const prevEthBalance = usePrevious(ethBalance)

  const { claimableRewards, setClaimableRewards, clearClaimableRewards } = useSpinStore(
    state => ({
      claimableRewards: state.claimableRewards,
      setClaimableRewards: state.setClaimableRewards,
      clearClaimableRewards: state.clearClaimableRewards,
    }),
    shallow
  )

  const totalClaimableAmount = useMemo(() => {
    return claimableRewards.reduce((sum, reward) => {
      return sum + Number(reward.mintAmount)
    }, 0)
  }, [claimableRewards])

  const ethDecimalCount = useMemo(() => {
    const _ethBalance = numeral(ethBalance).format('0,0.[0000]')
    const decimalCount = _ethBalance.toString().split('.')[1]?.length || 0
    return decimalCount
  }, [ethBalance])

  const claimAllRewards = useCallback(async () => {
    if (!authPublicAddress || claimableRewards.length === 0 || !fareSpinContract) return

    const roundIds = claimableRewards.map(reward => reward.roundId)
    const totalAmount = totalClaimableAmount
    try {
      setIsFetchingBalance(true)
      const tx = await fareSpinContract?.batchSettleEntries(
        roundIds,
        authPublicAddress,
        baseTxOverrides
      )
      await tx.wait()
      addToast({
        header: 'CLAIMED TOKENS',
        subheader: `${totalAmount} FARE`,
        type: 'success',
      })
    } catch (err) {
      setIsFetchingBalance(false)
      addToast({
        header: 'CLAIM TOKENS FAILED',
        subheader: (err as AxiosError).message,
        type: 'error',
      })
      console.error(err)
    }
  }, [authPublicAddress, claimableRewards, fareSpinContract, totalClaimableAmount, addToast])

  useEffect(() => {
    if (fareBalance !== prevFareBalance && isFetchingBalance) {
      setIsFetchingBalance(false)
      clearClaimableRewards()
    }
  }, [fareBalance, prevFareBalance, isFetchingBalance, setClaimableRewards, clearClaimableRewards])

  // const claimableBars = useMemo(() => {
  //   const count = claimableRewards.length <= 10 ? 10 : 20
  //   const bars = new Array(count)
  //     .fill('')
  //     .map((_, i) => <Block key={i} isFilled={i < claimableRewards.length} />)
  //   return bars
  // }, [claimableRewards])

  const chatRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scroll({
          top: chatRef.current.scrollHeight,
          behavior: 'smooth',
        })
      }
      // TODO: Probably need to call this scroll when the first batch of chats are received
    }, 500)
  }, [chatRef])

  return (
    <RightPanelWrapper
      transition={{
        duration: 1,
        ease: 'easeInOut',
      }}
      initial={{
        opacity: 0,
        transform: 'translateX(100px)',
      }}
      animate={{
        opacity: 1,
        transform: 'translateX(0px)',
      }}
      exit={{
        opacity: 0,
        transform: 'translateX(100px)',
      }}
    >
      <PanelContainer>
        <AnimatePresence>
          <BlockHeader isShowPanel={isShowPanel} onClick={() => setShowPanel(!isShowPanel)}>
            <motion.div
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
              {isShowPanel ? (
                <>
                  <img src={SVGS.walletIcon} alt="wallet-icon" />
                  <p>Balance</p>
                </>
              ) : (
                <CollapsedWrapper>
                  <img src={SVGS.ethIcon} alt="eth logo" />
                  <CountUp
                    className="balance-amount-display"
                    start={Number(prevEthBalance)}
                    end={Number(ethBalance)}
                    decimals={ethDecimalCount}
                    duration={2}
                    separator={','}
                    preserveValue
                  />
                  <img src={SVGS.fareIcon} alt="fare" />
                  <CountUp
                    className="balance-amount-display"
                    end={Number(fareBalance)}
                    decimals={0}
                    duration={2}
                    separator={','}
                    preserveValue
                  />
                </CollapsedWrapper>
              )}
            </motion.div>
            <img
              src={PNGS.chevronIcon}
              style={{
                transform: `rotate(${isShowPanel ? 180 : 0}deg)`,
                transition: '.2s ease-in-out',
              }}
            />
          </BlockHeader>
          {isShowPanel ? (
            <motion.div
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
              <BalanceWrapper>
                <BalanceList>
                  <BalanceRow>
                    <img src={SVGS.ethIcon} alt="eth logo" />
                    <CountUp
                      className="balance-amount-display"
                      start={Number(prevEthBalance)}
                      end={Number(ethBalance)}
                      decimals={ethDecimalCount}
                      duration={2}
                      separator={','}
                      preserveValue
                      suffix=" AGOR"
                    />
                  </BalanceRow>
                  <BalanceRow>
                    <img src={SVGS.fareIcon} alt="fare" />
                    <CountUp
                      className="balance-amount-display"
                      end={Number(fareBalance)}
                      decimals={0}
                      duration={2}
                      separator={','}
                      preserveValue
                      suffix=" FARE"
                    />
                  </BalanceRow>
                </BalanceList>
              </BalanceWrapper>
              <RewardsWrapper>
                <BlockSubHeader className="block-full-width">
                  <div>
                    <img src={SVGS.rewardIcon} alt="reward-icon" />
                    <p>CLAIMS</p>
                  </div>
                  <ClaimableText>
                    <CountUp
                      prefix={''}
                      suffix={' FARE'}
                      separator={','}
                      preserveValue
                      duration={2}
                      end={totalClaimableAmount}
                    />
                  </ClaimableText>
                </BlockSubHeader>
                {/* <BlockRow claimableCount={claimableBars.length}>{claimableBars}</BlockRow> */}
                <div>
                  <Button
                    buttonType={ButtonEnum.TRANSACTION}
                    isLoading={isFetchingBalance}
                    loadingText={'CLAIMING'}
                    onClick={claimAllRewards}
                    disabled={claimableRewards.length === 0 || isFetchingBalance}
                  >
                    CLAIM
                  </Button>
                </div>
              </RewardsWrapper>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </PanelContainer>
      <motion.div
        ref={chatRef}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
        initial={{
          opacity: 0,
          transform: 'translateX(100px)',
        }}
        animate={{
          opacity: 1,
          transform: 'translateX(0px)',
        }}
        exit={{
          opacity: 0,
          transform: 'translateX(100px)',
        }}
        style={{
          overflow: 'scroll',
          scrollBehavior: 'smooth',
        }}
      >
        <Chat />
      </motion.div>
    </RightPanelWrapper>
  )
}
