import { SVGS } from '@/assets'
import { AnimatePresence, motion } from 'framer-motion'
import numeral from 'numeral'
import {
  Form,
  FormAmountLabel,
  FormFooter,
  FormIndicator,
  FormLabel,
  FormLabelRow,
  FormTab,
  MotionFormSection,
} from '../shared/Form/style'
import { Input } from '../shared/Input'
import AmountSlider from '../shared/Slider/AmountSlider'
import useGlobalRefStore from '@/store/useGlobalRefStore'
import { Button, ButtonEnum } from '../shared/Button'
import { ModeButton } from '../shared/Button/style'
import ConnectWallet from '../shared/Wallet/ConnectWallet'
import { AllowMintBurn } from '../shared/Modal/AllowMintBurn'
import useAuth from '@/hooks/useAuth'
import { baseTxOverrides } from '@/constants/web3'
import { fareSpinAddress } from '@/lib/crypto'
import { type ContractTransaction } from 'ethers'
import useCrypto from '@/hooks/useCrypto'

export const DiceForm = () => {
  const [amount] = useState<number>(0)
  const { setBetAmountInputRef } = useGlobalRefStore(state => ({
    setBetAmountInputRef: state.setBetAmountInputRef,
    betAmountInputRef: state.betAmountInputRef,
  }))
  const { isAuthed, isWeb3Active } = useAuth()
  const [permissionModalLoading, setPermissionModalLoading] = useState(false)
  const [showPermissionModal, setShowPermissionModal] = useState(false)
  const showConnectWallet = useMemo(() => !isAuthed || !isWeb3Active, [isAuthed, isWeb3Active])
  const hasApprovedMintBurn = false // Need this migrated to DiceStore
  const showApproveMintBurn = useMemo(
    () => !showConnectWallet && !hasApprovedMintBurn,
    [showConnectWallet, hasApprovedMintBurn]
  )
  const { fareTokenContract } = useCrypto()
  const [formType, setFormType] = useState<'manual' | 'auto'>('manual')

  const approveMintBurn = useCallback(async () => {
    let tx: ContractTransaction | undefined
    try {
      setPermissionModalLoading(true)
      tx = await fareTokenContract?.setAllowContractMintBurn(fareSpinAddress, true, baseTxOverrides)
      await tx?.wait()

      setShowPermissionModal(false)
      //   setHasApprovedMintBurn(true)
    } catch (err) {
      // Todo: We need error catching here
      console.error(err)
      throw err
    } finally {
      setTimeout(() => {
        setPermissionModalLoading(false)
      }, 500)
    }
  }, [fareTokenContract, setShowPermissionModal, setPermissionModalLoading])

  const manualFormContent = useMemo(
    () => (
      <AnimatePresence mode="popLayout">
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
        >
          <FormLabelRow>
            <FormLabel>
              <FormIndicator isActive={true} />
              <FormAmountLabel>
                <span>ENTRY AMOUNT</span>
              </FormAmountLabel>
            </FormLabel>
            <FormLabel>
              <FormAmountLabel>
                <span>{numeral(amount).format('0,0')} FARE</span>
              </FormAmountLabel>
            </FormLabel>
          </FormLabelRow>
          <Input
            isNumeric
            getInputRef={setBetAmountInputRef}
            value={amount}
            allowLeadingZeros={false}
            allowNegative={false}
            decimalScale={0}
            isAllowed={({ floatValue = 0 }) => {
              return floatValue <= 1_000_000_000
            }}
            onFocus={event => event.target.select()}
            thousandSeparator={','}
            inputPrefix={<img src={SVGS.fareIcon} width={20} />}
          />
          <AmountSlider
            className="amount-slider"
            markClassName="amount-slider-mark"
            thumbClassName="amount-slider-thumb"
            trackClassName="amount-slider-track"
            min={0}
            value={amount}
            defaultValue={0}
            max={1000000}
            step={1}
          />
        </MotionFormSection>
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
        >
          <FormLabelRow>
            <FormLabel>
              <FormIndicator isActive={true} />
              <FormAmountLabel>
                <span>MULTIPLIER</span>
              </FormAmountLabel>
            </FormLabel>
            <FormLabel>
              <FormAmountLabel>
                <span>{numeral(amount).format('1.0000')}x</span>
              </FormAmountLabel>
            </FormLabel>
          </FormLabelRow>
          <Input
            isNumeric
            getInputRef={setBetAmountInputRef}
            value={amount}
            allowLeadingZeros={false}
            allowNegative={false}
            decimalScale={0}
            isAllowed={({ floatValue = 0 }) => {
              return floatValue <= 1_000_000_000
            }}
            onFocus={event => event.target.select()}
            thousandSeparator={','}
          />
          <AmountSlider
            className="amount-slider"
            markClassName="amount-slider-mark"
            thumbClassName="amount-slider-thumb"
            trackClassName="amount-slider-track"
            min={1}
            value={amount}
            defaultValue={1}
            max={1000000}
            step={1}
          />
        </MotionFormSection>
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
        >
          <FormLabelRow>
            <FormLabel>
              <FormIndicator isActive={true} />
              <FormAmountLabel>
                <span>ROLL OVER</span>
              </FormAmountLabel>
            </FormLabel>
            <FormLabel>
              <FormAmountLabel>
                <span>{numeral(amount).format('0')}</span>
              </FormAmountLabel>
            </FormLabel>
          </FormLabelRow>
          <Input
            isNumeric
            getInputRef={setBetAmountInputRef}
            value={amount}
            allowLeadingZeros={false}
            allowNegative={false}
            decimalScale={0}
            isAllowed={({ floatValue = 0 }) => {
              return floatValue <= 1_000_000_000
            }}
            onFocus={event => event.target.select()}
            thousandSeparator={','}
          />
          <AmountSlider
            className="amount-slider"
            markClassName="amount-slider-mark"
            thumbClassName="amount-slider-thumb"
            trackClassName="amount-slider-track"
            min={0}
            value={amount}
            defaultValue={0}
            max={1000000}
            step={1}
          />
        </MotionFormSection>
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
        >
          <FormLabelRow>
            <FormLabel>
              <FormIndicator isActive={true} />
              <FormAmountLabel>
                <span>WIN CHANCE</span>
              </FormAmountLabel>
            </FormLabel>
            <FormLabel>
              <FormAmountLabel>
                <span>{numeral(amount).format('0.0000')}%</span>
              </FormAmountLabel>
            </FormLabel>
          </FormLabelRow>
          <Input
            isNumeric
            getInputRef={setBetAmountInputRef}
            value={amount}
            allowLeadingZeros={false}
            allowNegative={false}
            decimalScale={0}
            isAllowed={({ floatValue = 0 }) => {
              return floatValue <= 1_000_000_000
            }}
            onFocus={event => event.target.select()}
            thousandSeparator={','}
          />
          <AmountSlider
            className="amount-slider"
            markClassName="amount-slider-mark"
            thumbClassName="amount-slider-thumb"
            trackClassName="amount-slider-track"
            min={0}
            value={amount}
            defaultValue={0}
            //   disabled={availableFare <= 0 && amount <= 0}
            //   max={Number(fareBalance) - totalEntryQueue}
            max={1000000}
            step={1}
            //   onChange={setAmount}
          />
        </MotionFormSection>
      </AnimatePresence>
    ),
    [amount, setBetAmountInputRef]
  )

  const autoFormContent = useMemo(
    () => (
      <AnimatePresence mode="popLayout">
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
        >
          <FormLabelRow>
            <FormLabel>
              <FormIndicator isActive={true} />
              <FormAmountLabel>
                <span>ENTRY AMOUNT</span>
              </FormAmountLabel>
            </FormLabel>
            <FormLabel>
              <FormAmountLabel>
                <span>{numeral(amount).format('0,0')} FARE</span>
              </FormAmountLabel>
            </FormLabel>
          </FormLabelRow>
          <Input
            isNumeric
            getInputRef={setBetAmountInputRef}
            value={amount}
            allowLeadingZeros={false}
            allowNegative={false}
            decimalScale={0}
            isAllowed={({ floatValue = 0 }) => {
              return floatValue <= 1_000_000_000
            }}
            onFocus={event => event.target.select()}
            thousandSeparator={','}
            inputPrefix={<img src={SVGS.fareIcon} width={20} />}
          />
          <AmountSlider
            className="amount-slider"
            markClassName="amount-slider-mark"
            thumbClassName="amount-slider-thumb"
            trackClassName="amount-slider-track"
            min={0}
            value={amount}
            defaultValue={0}
            max={1000000}
            step={1}
          />
        </MotionFormSection>
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
        >
          <FormLabelRow>
            <FormLabel>
              <FormIndicator isActive={true} />
              <FormAmountLabel>
                <span>NUMBER OF ENTRIES</span>
              </FormAmountLabel>
            </FormLabel>
            <FormLabel>
              <FormAmountLabel>
                <span>{numeral(amount).format('0,0')} FARE</span>
              </FormAmountLabel>
            </FormLabel>
          </FormLabelRow>
          <Input
            isNumeric
            getInputRef={setBetAmountInputRef}
            value={amount}
            allowLeadingZeros={false}
            allowNegative={false}
            decimalScale={0}
            isAllowed={({ floatValue = 0 }) => {
              return floatValue <= 1_000_000_000
            }}
            onFocus={event => event.target.select()}
            thousandSeparator={','}
          />
          <AmountSlider
            className="amount-slider"
            markClassName="amount-slider-mark"
            thumbClassName="amount-slider-thumb"
            trackClassName="amount-slider-track"
            min={0}
            value={amount}
            defaultValue={0}
            max={1000000}
            step={1}
          />
        </MotionFormSection>
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
        >
          <FormLabelRow>
            <FormLabel>
              <FormIndicator isActive={true} />
              <FormAmountLabel>
                <span>ON WIN</span>
              </FormAmountLabel>
            </FormLabel>
          </FormLabelRow>
          <Input
            isNumeric
            getInputRef={setBetAmountInputRef}
            value={amount}
            allowLeadingZeros={false}
            allowNegative={false}
            decimalScale={0}
            isAllowed={({ floatValue = 0 }) => {
              return floatValue <= 1_000_000_000
            }}
            onFocus={event => event.target.select()}
            thousandSeparator={','}
            inputPrefix={
              <>
                <button>Reset</button>
                <button>Increase by</button>
              </>
            }
            inputSuffix={<img src={SVGS.fareIcon} width={20} />}
          />
          <AmountSlider
            className="amount-slider"
            markClassName="amount-slider-mark"
            thumbClassName="amount-slider-thumb"
            trackClassName="amount-slider-track"
            min={0}
            value={amount}
            defaultValue={0}
            max={1000000}
            step={1}
          />
        </MotionFormSection>
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
        >
          <FormLabelRow>
            <FormLabel>
              <FormIndicator isActive={true} />
              <FormAmountLabel>
                <span>ON LOSS</span>
              </FormAmountLabel>
            </FormLabel>
          </FormLabelRow>
          <Input
            isNumeric
            getInputRef={setBetAmountInputRef}
            value={amount}
            allowLeadingZeros={false}
            allowNegative={false}
            decimalScale={0}
            isAllowed={({ floatValue = 0 }) => {
              return floatValue <= 1_000_000_000
            }}
            onFocus={event => event.target.select()}
            thousandSeparator={','}
            inputPrefix={
              <>
                <button>Reset</button>
                <button>Increase by</button>
              </>
            }
            inputSuffix={<img src={SVGS.fareIcon} width={20} />}
          />
          <AmountSlider
            className="amount-slider"
            markClassName="amount-slider-mark"
            thumbClassName="amount-slider-thumb"
            trackClassName="amount-slider-track"
            min={0}
            value={amount}
            defaultValue={0}
            max={1000000}
            step={1}
          />
        </MotionFormSection>
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
        >
          <FormLabelRow>
            <FormLabel>
              <FormIndicator isActive={true} />
              <FormAmountLabel>
                <span>STOP ON PROFIT</span>
              </FormAmountLabel>
            </FormLabel>
            <FormLabel>
              <FormAmountLabel>
                <span>{numeral(amount).format('0,0')} FARE</span>
              </FormAmountLabel>
            </FormLabel>
          </FormLabelRow>
          <Input
            isNumeric
            getInputRef={setBetAmountInputRef}
            value={amount}
            allowLeadingZeros={false}
            allowNegative={false}
            decimalScale={0}
            isAllowed={({ floatValue = 0 }) => {
              return floatValue <= 1_000_000_000
            }}
            onFocus={event => event.target.select()}
            thousandSeparator={','}
          />
          <AmountSlider
            className="amount-slider"
            markClassName="amount-slider-mark"
            thumbClassName="amount-slider-thumb"
            trackClassName="amount-slider-track"
            min={0}
            value={amount}
            defaultValue={0}
            max={1000000}
            step={1}
          />
        </MotionFormSection>
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
        >
          <FormLabelRow>
            <FormLabel>
              <FormIndicator isActive={true} />
              <FormAmountLabel>
                <span>STOP ON LOSS</span>
              </FormAmountLabel>
            </FormLabel>
            <FormLabel>
              <FormAmountLabel>
                <span>{numeral(amount).format('0,0')} FARE</span>
              </FormAmountLabel>
            </FormLabel>
          </FormLabelRow>
          <Input
            isNumeric
            getInputRef={setBetAmountInputRef}
            value={amount}
            allowLeadingZeros={false}
            allowNegative={false}
            decimalScale={0}
            isAllowed={({ floatValue = 0 }) => {
              return floatValue <= 1_000_000_000
            }}
            onFocus={event => event.target.select()}
            thousandSeparator={','}
          />
          <AmountSlider
            className="amount-slider"
            markClassName="amount-slider-mark"
            thumbClassName="amount-slider-thumb"
            trackClassName="amount-slider-track"
            min={0}
            value={amount}
            defaultValue={0}
            max={1000000}
            step={1}
          />
        </MotionFormSection>
      </AnimatePresence>
    ),
    []
  )

  return (
    <Form>
      <FormTab tabs={2}>
        <ModeButton isActive={formType === 'manual'} onClick={() => setFormType('manual')}>
          Manual
        </ModeButton>
        <ModeButton isActive={formType === 'auto'} onClick={() => setFormType('auto')}>
          Auto
        </ModeButton>
      </FormTab>

      {formType === 'manual' ? manualFormContent : autoFormContent}

      <FormFooter>
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
              disabled={false}
              isLoading={false}
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
  )
}
