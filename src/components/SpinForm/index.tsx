import shallow from 'zustand/shallow'
import { AnimatePresence, motion } from 'framer-motion'
import numeral from 'numeral'
import { ethers, type ContractReceipt, type ContractTransaction } from 'ethers'
import { type OnValueChange } from 'react-number-format'

import { nanoid } from 'nanoid'
import SubmittedBetItem from './form/SubmittedBetItem'
import ActiveBetItem from './form/ActiveBetItem'
import {
  betItemVariant,
  betSubmittedVariant,
  fetchingSubmittedBets,
  submittedAlertVariant,
  submittedAlertOverlayVariant,
} from './form/selectBetsVariants'
import BetAmountControls from './form/BetAmountControls'
import { COLORS } from '@/design'
import SpinColorSelector from '@/components/SpinForm/form/SpinColorSelector'
import {
  BetCart,
  ModeButtonRow,
  BetsContainer,
  SFetchingBets,
  SSubmittedOverlay,
  SSubmittedAlert,
  SWarning,
} from '@/components/SpinForm/style'
import { Button, ButtonEnum } from '@/components/shared/Button'
import { type GameModeNumber } from '@/components/Wheel/types'
import { Input } from '@/components/shared/Input'
import useAuth from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import useCrypto from '@/hooks/useCrypto'
import useWheelStore from '@/store/useWheelStore'
import useSpinStore from '@/store/useSpinStore'
import { fareSpinAddress, getTxErrorMsg } from '@/lib/crypto'
import { GameModeLimitMap } from '@/utils/spin'
import { type EntryQueueItem } from '@/store/types'
import { baseTxOverrides } from '@/constants/web3'
import useGlobalRefStore from '@/store/useGlobalRefStore'
import AmountSlider from '@/components/shared/Slider/AmountSlider'
import { ModeButton } from '@/components/shared/Button/style'
import ConnectWallet from '@/components/shared/Wallet/ConnectWallet'
import { SVGS } from '@/assets'
import { DisplayToolTip, FareTooltip } from '@/components/shared/Tooltip'
import { Spinner } from '@/components/shared/Spinner'
import {
  Form,
  FormAmountLabel,
  FormFooter,
  FormIndicator,
  FormLabel,
  FormLabelRow,
  FormSection,
  MotionFormSection,
} from '@/components/shared/Form/style'
import { AllowMintBurn } from '../shared/Modal/AllowMintBurn'

const gameModeMap = (gmId: GameModeNumber): 0 | 1 | 2 => {
  if (gmId === 2) {
    return 0
  } else if (gmId === 10) {
    return 1
  } else {
    return 2
  }
}

const inverseGameModeMap = (gmId: number) => {
  if (gmId === 0) {
    return 2
  } else if (gmId === 1) {
    return 10
  } else {
    return 100
  }
}

const SpinForm = () => {
  const [isFetchingBets, setIsFetchingBets] = useState(false)
  const [isSubmittingBets, setIsSubmittingBets] = useState(false)
  const [permissionModalLoading, setPermissionModalLoading] = useState(false)
  const [showPermissionModal, setShowPermissionModal] = useState(false)

  const { isAuthed, isWeb3Active, account, authPublicAddress } = useAuth()
  const { fareSpinContract, fareTokenContract, fareBalance, setFareBalance } = useCrypto()
  const { addToast } = useToast()
  const {
    hasApprovedMintBurn,
    setHasApprovedMintBurn,
    isRoundPaused,
    isEntryOpen,
    isSpinning,
    isFinished,
    entryQueue,
    clearEntryQueue,
    removeEntryQueueItem,
    addEntryQueueItem,
    mySubmittedEntries,
  } = useSpinStore(
    state => ({
      mySubmittedEntries: state.mySubmittedEntries,
      isRoundPaused: state.isRoundPaused,
      isEntryOpen:
        state.roomStatus === 'countdown' || state.roomStatus === 'waiting-for-first-entry',
      isFinished: state.roomStatus === 'finished',
      isSpinning: state.roomStatus === 'spinning',
      entryQueue: state.entryQueue,
      clearEntryQueue: state.clearEntryQueue,
      removeEntryQueueItem: state.removeEntryQueueItem,
      addEntryQueueItem: state.addEntryQueueItem,
      hasApprovedMintBurn: state.hasApprovedMintBurn,
      setHasApprovedMintBurn: state.setHasApprovedMintBurn,
    }),
    shallow
  )
  const {
    amount,
    setAmount,
    setSelectedGameMode,
    selectedGameMode,
    setTickSelected,
    tickSelected,
    setTickHovered,
  } = useWheelStore(
    state => ({
      selectedGameMode: state.selectedGameMode,
      setSelectedGameMode: state.setSelectedGameMode,
      tickSelected: state.tickSelected,
      setTickSelected: state.setTickSelected,
      amount: state.selectBetAmount,
      setAmount: state.setSelectBetAmount,
      setTickHovered: state.setTickHovered,
    }),
    shallow
  )
  const { setBetAmountInputRef } = useGlobalRefStore(state => ({
    setBetAmountInputRef: state.setBetAmountInputRef,
    betAmountInputRef: state.betAmountInputRef,
  }))

  const totalEntryQueue = useMemo(
    () =>
      entryQueue.reduce((total, item) => {
        return total + item.amount
      }, 0),
    [entryQueue]
  )

  const showConnectWallet = useMemo(() => !isAuthed || !isWeb3Active, [isAuthed, isWeb3Active])
  const showApproveMintBurn = useMemo(
    () => !showConnectWallet && !hasApprovedMintBurn,
    [showConnectWallet, hasApprovedMintBurn]
  )

  const currentGameModeCount = useMemo(() => {
    return entryQueue.reduce((limit, item) => {
      if (selectedGameMode === item.contractModeId) {
        return limit + 1
      }
      return limit
    }, 0)
  }, [selectedGameMode, entryQueue])

  const availableFare = useMemo(
    () =>
      isNaN(Number(fareBalance) - (totalEntryQueue + amount))
        ? Number(fareBalance) - totalEntryQueue
        : Number(fareBalance) - (totalEntryQueue + amount),
    [fareBalance, totalEntryQueue, amount]
  )

  const canAddNewBet = useMemo(
    () => !!(amount && tickSelected && selectedGameMode && availableFare >= 0),
    [amount, tickSelected, selectedGameMode, availableFare]
  )

  const canSelectColor = useMemo(() => amount > 0 && availableFare >= 0, [amount, availableFare])

  const canSubmitEntry = useMemo(
    () => Boolean(isEntryOpen && entryQueue.length > 0 && !isRoundPaused && !mySubmittedEntries),
    [isEntryOpen, entryQueue, isRoundPaused, mySubmittedEntries]
  )

  const isLimitReached = useMemo(
    () => currentGameModeCount >= GameModeLimitMap[selectedGameMode],
    [currentGameModeCount, selectedGameMode]
  )

  const submittedBets = useMemo(() => {
    if (!mySubmittedEntries) return [] as EntryQueueItem[]

    const items: EntryQueueItem[] = mySubmittedEntries.entries.map<EntryQueueItem>(entry => ({
      entryId: String(entry.entryIdx),
      amount: Number(entry.amount),
      contractModeId: inverseGameModeMap(entry.contractModeId),
      pickedNumber: entry.pickedNumber,
    }))

    return items
  }, [mySubmittedEntries])

  const selectColorTitleText = useMemo(() => {
    if (availableFare < 0) return 'FARE AMOUNT EXCEEDED'
    if (Number(fareBalance) === 0) return 'NOT ENOUGH FARE'
    // if (isLimitReached) return 'SELECT ANOTHER MODE'
    if (Number(fareBalance) - totalEntryQueue === 0) return "YOU'RE ALL IN!"
    if (!isLimitReached && !canSelectColor) return 'ENTER AMOUNT TO SELECT COLOR'
    return 'SELECT COLOR'
  }, [isLimitReached, canSelectColor, availableFare, fareBalance, totalEntryQueue])

  const stepAmount = useMemo(
    () => Math.max(Math.round((Number(fareBalance) - totalEntryQueue) * 0.0015), 1),
    [fareBalance, totalEntryQueue]
  )

  const setSelectedGameModeClearTicks = useCallback(
    (gameMode: GameModeNumber) => {
      setSelectedGameMode(gameMode)
      setTickSelected(null)
    },
    [setSelectedGameMode, setTickSelected]
  )

  const onAmountChange = useCallback(
    ({ value, formattedValue: _formattedValue }) => {
      let valueNum = Number(value)
      if (valueNum >= 1_000_000_000) valueNum = 1_000_000_000

      setAmount(valueNum)
    },
    [setAmount]
  ) as OnValueChange

  const addNewBet = useCallback(() => {
    if (!tickSelected || !amount || isLimitReached) return
    const amountFloor = Math.floor(amount) // Ensure that no decimal amounts can be added
    if (amountFloor < 1) {
      setAmount(0)
      setTickSelected(null)
      setTickHovered(null)
      return
    }

    addEntryQueueItem({
      entryId: nanoid(),
      amount: amountFloor,
      contractModeId: selectedGameMode,
      pickedNumber: tickSelected.id % selectedGameMode,
    })
    setAmount(0)
    setTickSelected(null)
    setTickHovered(null)
  }, [
    amount,
    selectedGameMode,
    tickSelected,
    addEntryQueueItem,
    setTickSelected,
    setTickHovered,
    isLimitReached,
    setAmount,
  ])

  const submitBets = useCallback(async () => {
    if (!account) return
    let tx: ContractTransaction | undefined
    let _rec: ContractReceipt
    setIsSubmittingBets(true)
    try {
      const batchEntryParams = entryQueue.map(entry => ({
        contractModeId: gameModeMap(entry.contractModeId),
        amount: ethers.utils.parseEther(entry.amount.toString()),
        pickedNumber: entry.pickedNumber,
      }))

      tx = await fareSpinContract?.placeBatchEntry(batchEntryParams, baseTxOverrides)
      if (tx) {
        _rec = await tx.wait()
        // console.log(tx, rec)
        addToast({
          // header: `${entryQueue.length > 1 ? 'ENTRIES' : 'ENTRY'} SUBMITTED`,
          header: 'SUBMITTED ENTRY',
          type: 'success',
        })
      }

      setFareBalance(String(Number(fareBalance) - totalEntryQueue))
      clearEntryQueue()
      setIsFetchingBets(true)
    } catch (err) {
      console.error(err)
      addToast({
        // header: `${entryQueue.length > 1 ? 'ENTRIES' : 'ENTRY'} SUBMISSION FAILED`,
        header: 'SUBMIT ENTRY FAILED',
        subheader: getTxErrorMsg(err),
        type: 'error',
      })
      throw err
    } finally {
      setIsSubmittingBets(false)
    }
  }, [
    account,
    entryQueue,
    fareSpinContract,
    setFareBalance,
    fareBalance,
    totalEntryQueue,
    clearEntryQueue,
    addToast,
  ])

  const approveMintBurn = useCallback(async () => {
    let tx: ContractTransaction | undefined
    try {
      setPermissionModalLoading(true)
      tx = await fareTokenContract?.setAllowContractMintBurn(fareSpinAddress, true, baseTxOverrides)
      await tx?.wait()

      setShowPermissionModal(false)
      setHasApprovedMintBurn(true)
    } catch (err) {
      // Todo: We need error catching here
      console.error(err)
      throw err
    } finally {
      setTimeout(() => {
        setPermissionModalLoading(false)
      }, 500)
    }
  }, [fareTokenContract, setShowPermissionModal, setPermissionModalLoading, setHasApprovedMintBurn])

  const setHalfAmount = useCallback(() => {
    setAmount(Math.floor(amount / 2))
  }, [setAmount, amount])

  const setDoubleAmount = useCallback(() => {
    const doubleAmount = amount * 2
    const maxDoubleAmount = Number(fareBalance) - totalEntryQueue
    if (doubleAmount >= maxDoubleAmount) {
      setAmount(maxDoubleAmount)
      return
    }
    setAmount(doubleAmount)
  }, [setAmount, amount, fareBalance, totalEntryQueue])

  useEffect(() => {
    if (!authPublicAddress || !fareTokenContract || !isAuthed) return
    ;(async () => {
      const didAllow = await fareTokenContract?.didUserAllowContract(
        authPublicAddress,
        fareSpinAddress
      )
      setHasApprovedMintBurn(Boolean(didAllow))
    })()
  }, [authPublicAddress, isAuthed, fareTokenContract, setHasApprovedMintBurn])

  useEffect(() => {
    if (mySubmittedEntries && isFetchingBets) {
      setIsFetchingBets(false)
    }
  }, [mySubmittedEntries, isFetchingBets])

  useEffect(() => {
    if (canAddNewBet) addNewBet()
  }, [addNewBet, canAddNewBet])

  return (
    <>
      <DisplayToolTip id="fare-tooltip" />
      <Form>
        <FormSection>
          <FormLabel>
            <FormIndicator isActive={!!selectedGameMode} />
            <FormAmountLabel>SELECT MODE</FormAmountLabel>
          </FormLabel>
          <ModeButtonRow>
            <ModeButton
              isActive={selectedGameMode === 2}
              onClick={() => setSelectedGameModeClearTicks(2)}
            >
              2X
            </ModeButton>
            <ModeButton
              isActive={selectedGameMode === 10}
              onClick={() => setSelectedGameModeClearTicks(10)}
            >
              10X
            </ModeButton>
            <ModeButton
              isActive={selectedGameMode === 100}
              onClick={() => setSelectedGameModeClearTicks(100)}
            >
              100X
            </ModeButton>
          </ModeButtonRow>
        </FormSection>

        <AnimatePresence mode="popLayout">
          {!mySubmittedEntries && (
            <MotionFormSection
              key={'bet-amount-input'}
              as={motion.div}
              initial={{ opacity: 0, scaleY: 1 }}
              animate={{
                opacity: 1,
                scaleY: 1,
                transition: { type: 'tween', duration: 0.25 },
              }}
              exit={{
                opacity: 0,
                scaleY: 0.2,
              }}
              transition={{ type: 'spring', stiffness: 550, damping: 28 }}
              className="sm-pd-bottom"
            >
              <FormLabelRow>
                <FormLabel>
                  <FormIndicator isActive={!!amount} />
                  <FormAmountLabel>
                    <span>ENTRY AMOUNT</span>
                  </FormAmountLabel>
                </FormLabel>
                <FormLabel>
                  <FormAmountLabel className={availableFare < 0 ? 'is-negative' : ''}>
                    <span>{numeral(availableFare).format('0,0')} FARE</span>
                  </FormAmountLabel>
                </FormLabel>
              </FormLabelRow>
              <Input
                isNumeric
                getInputRef={setBetAmountInputRef}
                value={amount}
                onValueChange={onAmountChange}
                allowLeadingZeros={false}
                allowNegative={false}
                decimalScale={0}
                isAllowed={({ floatValue = 0 }) => {
                  return floatValue <= 1_000_000_000
                }}
                onFocus={event => event.target.select()}
                thousandSeparator={','}
                inputPrefix={<img src={SVGS.fareIcon} width={20} />}
                inputSuffix={
                  <BetAmountControls
                    onHalfAmount={setHalfAmount}
                    onTwoTimesAmount={setDoubleAmount}
                  />
                }
              />
              <AmountSlider
                className="amount-slider"
                markClassName="amount-slider-mark"
                thumbClassName="amount-slider-thumb"
                trackClassName="amount-slider-track"
                min={0}
                value={amount}
                defaultValue={0}
                disabled={availableFare <= 0 && amount <= 0}
                max={Number(fareBalance) - totalEntryQueue}
                step={stepAmount}
                onChange={setAmount}
              />
            </MotionFormSection>
          )}

          {!mySubmittedEntries && (
            <MotionFormSection
              key={'select-color-amount'}
              initial={{ opacity: 0, scaleY: 1 }}
              animate={{
                opacity: 1,
                scaleY: 1,
                transition: { type: 'tween', duration: 0.25 },
              }}
              exit={{
                opacity: 0,
                scaleY: 0.2,
              }}
              transition={{ type: 'spring', stiffness: 550, damping: 28 }}
              className={!canSelectColor ? 'notActive' : ''}
            >
              <FormLabel>
                <FormIndicator isActive={!!tickSelected} />
                <FormAmountLabel>
                  <span>{selectColorTitleText}</span>
                  <FareTooltip
                    className="limit-reached"
                    place="right"
                    content={`${selectedGameMode}X LIMIT REACHED`}
                  >
                    <span style={isLimitReached ? { color: COLORS.error } : {}}>
                      {isLimitReached &&
                        `(${currentGameModeCount}/${GameModeLimitMap[selectedGameMode]})`}
                    </span>
                  </FareTooltip>
                </FormAmountLabel>
              </FormLabel>
              <SpinColorSelector selectedGameMode={selectedGameMode} notClickable={false} />
            </MotionFormSection>
          )}

          <FormSection key="bet-queue" className="stretch-content content-scroll">
            {mySubmittedEntries ? (
              <BetsContainer>
                <FormLabel>
                  <div className="queued-title-wrapper">
                    <span>SUBMITTED ENTRIES ({submittedBets.length})</span>
                    <span>TOTAL: {numeral(mySubmittedEntries.totalEntryAmount).format('0,0')}</span>
                  </div>
                </FormLabel>
                <BetCart
                  key="bet-cart"
                  variants={betSubmittedVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {submittedBets.map(entry => (
                    <SubmittedBetItem
                      variants={betItemVariant}
                      txHash={mySubmittedEntries.placedTxHash}
                      key={entry.entryId}
                      setSelectedGameMode={setSelectedGameModeClearTicks}
                      isActive={!isEntryOpen}
                      entry={entry}
                    />
                  ))}
                </BetCart>
              </BetsContainer>
            ) : (
              <BetsContainer>
                <FormLabel>
                  <div className="queued-title-wrapper">
                    <FareTooltip
                      className="qued bets"
                      place="right"
                      content={`${selectedGameMode}X LIMIT REACHED`}
                    >
                      <span className="qued bets">QUEUED ENTRIES ({entryQueue.length})</span>
                    </FareTooltip>
                    <span>Total: {numeral(totalEntryQueue).format('0,0')}</span>
                  </div>
                  {entryQueue.length === 0 && <p>You have no queued entries.</p>}
                </FormLabel>
                <BetCart>
                  {entryQueue.map(entry => (
                    <ActiveBetItem
                      layout
                      layoutId={entry.entryId}
                      initial={{ opacity: 0, y: -40, scale: 1 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        y: 0,
                        scale: 0.6,
                        transition: { type: 'tween', duration: 0.15 },
                      }}
                      transition={{ type: 'spring', stiffness: 550, damping: 28 }}
                      key={entry.entryId}
                      setSelectedGameMode={setSelectedGameModeClearTicks}
                      isActive={false}
                      entry={entry}
                      onRemove={removeEntryQueueItem}
                    />
                  ))}
                </BetCart>
              </BetsContainer>
            )}
            <AnimatePresence>
              {isFetchingBets && (
                <SFetchingBets
                  key="fetching-bets"
                  variants={fetchingSubmittedBets}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Spinner mode="default" />
                  <span>Fetching submitted entries...</span>
                </SFetchingBets>
              )}
            </AnimatePresence>
          </FormSection>
        </AnimatePresence>

        <FormFooter>
          <AnimatePresence>
            {mySubmittedEntries && !isRoundPaused && (
              <SSubmittedOverlay
                key="bet-submitted-alert"
                variants={submittedAlertOverlayVariant}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <SSubmittedAlert
                  key="submitted-alert"
                  variants={submittedAlertVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  🔒 ENTRY SUBMITTED
                </SSubmittedAlert>
              </SSubmittedOverlay>
            )}
            {(isSpinning || isFinished) && (
              <SSubmittedOverlay
                key="round-ongoing-alert"
                variants={submittedAlertOverlayVariant}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <SWarning
                  key="submitted-warning"
                  variants={submittedAlertVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  🔒 ROUND ONGOING
                </SWarning>
              </SSubmittedOverlay>
            )}
          </AnimatePresence>
          <div>
            {showConnectWallet && <ConnectWallet style={{ width: '100%' }} />}
            {showApproveMintBurn && (
              <Button
                buttonType={ButtonEnum.TRANSACTION}
                onClick={() => setShowPermissionModal(true)}
                disabled={false}
                isLoading={showPermissionModal}
                loadingText={'APPROVING FARESPIN'}
              >
                APPROVE FARESPIN
              </Button>
            )}
            {!showConnectWallet && !showApproveMintBurn && (
              <Button
                buttonType={ButtonEnum.TRANSACTION}
                onClick={submitBets}
                disabled={!canSubmitEntry || isSubmittingBets}
                isLoading={isSubmittingBets}
                loadingText={'SUBMITTING ENTRY'}
              >
                SUBMIT ENTRY
              </Button>
            )}
          </div>
        </FormFooter>
        <AllowMintBurn
          show={showPermissionModal}
          setShow={setShowPermissionModal}
          onApprove={approveMintBurn}
          isLoading={permissionModalLoading}
        />
      </Form>
    </>
  )
}
export default SpinForm
