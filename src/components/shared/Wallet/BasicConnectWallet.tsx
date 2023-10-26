// import useAuth from '@/hooks/useAuth'
import { useWeb3React } from '@web3-react/core'
import { AnimatePresence, motion } from 'framer-motion'
import { metamask } from '@/lib/crypto/connectors'
import { shortenAddress } from '@/utils/text'
import useAccessKeyStore from '@/store/useAccessKeyStore'
import useAuth from '@/hooks/useAuth'
import { Button, ButtonEnum } from '../Button'
import { AddressWrapper } from '../Header/style'
import Avatar from '../Avatar'

const SBasicWalletConnected = styled(AddressWrapper)`
  cursor: pointer;
  > p {
    margin-right: 16px;
  }
`

const SBasicConnectWallet = styled(motion.div)<{ isActivated: boolean }>`
  position: fixed;
  /* top: 18px; */
  /* right: 24px; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 52vh;
  ${props =>
    props.isActivated &&
    css`
      top: 18px;
      right: 24px;
      margin-top: 0px;
    `}
`

const SButton = styled(Button)`
  font-size: 36px;
`

interface IBasicWalletConnectedProps {
  account?: string
  onClick: () => void
}

const BasicWalletConnected = ({ account, onClick }: IBasicWalletConnectedProps) => {
  return (
    <SBasicWalletConnected onClick={onClick} initial={{ x: 50 }} animate={{ x: 0 }}>
      <p>{shortenAddress(account || '')}</p>
      <Avatar seed={account || ''} />
    </SBasicWalletConnected>
  )
  // return (
  //   <SBasicWalletConnected onClick={onClick}>{shortenAddress(account || '')}</SBasicWalletConnected>
  // )
}

const BasicConnectWallet = ({ isLoaded, ...props }: { isLoaded: boolean }) => {
  const { isConnecting, setIsConnecting, setKeyAnimName, setHasAccess } = useAccessKeyStore()
  const { authenticate, logout, authPublicAddress, verify, isWeb3Active } = useAuth()
  const web3 = useWeb3React()
  const { account, isActive } = web3

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true)
      await authenticate()
      setIsConnecting(false)
      setKeyAnimName('locked')
    } catch (err) {
      console.log(err)
      setIsConnecting(false)
    }
  }, [setIsConnecting, authenticate, setKeyAnimName])

  const disconnectWallet = useCallback(async () => {
    try {
      if (!isActive) return
      // await metamask.deactivate?.()
      // metamask.resetState()
      await logout()
      setKeyAnimName('none')
      window.location.reload()
    } catch (err) {
      setIsConnecting(false)
    }
  }, [isActive, setIsConnecting, setKeyAnimName, logout])

  useEffect(() => {
    if (authPublicAddress && isWeb3Active) {
      if (account?.toLowerCase() === '0xc93c4dE0B44E22c569A28AEF64c7a8aA05DA25e9'.toLowerCase()) {
        setKeyAnimName('locked')
      } else {
        setKeyAnimName('locked')
      }
    }
  }, [isActive, account, setKeyAnimName, setHasAccess, isWeb3Active, authPublicAddress])

  useEffect(() => {
    ;(async () => {
      const authObj = await verify()

      if (authObj?.isValid && isWeb3Active) {
        setKeyAnimName('locked')
      }
    })()
  }, [verify, setKeyAnimName, isWeb3Active])

  useEffect(() => {
    ;(async () => {
      try {
        await metamask.connectEagerly()
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  if (!isLoaded) {
    return null
  }

  return (
    <AnimatePresence>
      <SBasicConnectWallet
        isActivated={isActive}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {authPublicAddress ? (
          <BasicWalletConnected account={account} onClick={disconnectWallet} />
        ) : (
          <SButton
            buttonType={ButtonEnum.CONNECT_WALLET}
            disabled={isConnecting}
            // onClick={connectWallet}
            onClick={connectWallet}
            isLoading={isConnecting}
            loadingText={'CONNECTING'}
            {...props}
          >
            Connect wallet
          </SButton>
        )}
      </SBasicConnectWallet>
    </AnimatePresence>
  )
}

export default BasicConnectWallet
