import Modal from 'react-modal'
import { type EthersError, getParsedEthersError } from '@enzoferey/ethers-error-parser'
import { useToast } from '@/hooks/useToast'
import { BaseModal } from '.'
import { DenyButton } from './style'
import { Button, ButtonEnum } from '../Button'

Modal.setAppElement('#root')

interface IBaseModalProps {
  show: boolean
  setShow: (show: boolean) => void
  onApprove: () => Promise<void>
  width?: number
  maxWidth?: number
  height?: number
  isLoading: boolean
  title?: JSX.Element | string
}

export const AllowMintBurn = ({
  show,
  setShow,
  onApprove: _onApprove,
  isLoading,
}: IBaseModalProps) => {
  const [errorMsg, setErrorMsg] = useState('')
  const { addToast } = useToast()

  const onApprove = useCallback(async () => {
    try {
      setErrorMsg('')
      await _onApprove()
      addToast({
        header: 'APPROVED GAME CONTRACT',
        type: 'success',
      })
    } catch (error: any) {
      // TODO: Create a map of etherErrorCodes and display errors for the user
      const { errorCode } = getParsedEthersError(error as EthersError)
      addToast({
        header: 'APPROVE GAME CONTRACT FAILED',
        subheader: errorCode,
        type: 'error',
      })
      setErrorMsg(errorCode)
    }
  }, [_onApprove, addToast])

  const onDeny = useCallback(() => {
    addToast({
      header: 'APPROVE GAME CONTRACT FAILED',
      subheader: 'User denied mint/burn approval',
      type: 'error',
    })

    setShow(false)
  }, [addToast, setShow])

  return (
    <BaseModal
      show={show}
      setShow={setShow}
      error={errorMsg}
      title={'FareSpin Permission'}
      content={
        <>
          <p>
            You must send a transaction to the FareToken contract agreeing to allow the FareSpin
            contract to mint/burn.
          </p>
          <br />
          <p>Click APPROVE to prompt the transaction in your connected wallet.</p>
        </>
      }
      footer={
        <>
          <DenyButton onClick={onDeny}>Deny</DenyButton>
          <Button
            buttonType={ButtonEnum.TRANSACTION}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={onApprove}
            loadingText={'Approving'}
          >
            Approve
          </Button>
        </>
      }
    />
  )
}
