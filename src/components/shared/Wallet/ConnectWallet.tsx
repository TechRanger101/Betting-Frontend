import { useWeb3React } from '@web3-react/core'
import useAuth from '@/hooks/useAuth'

import { coinbaseWallet, metamask, walletConnect } from '@/lib/crypto/connectors'
import { testChainParams, arbitrumGoerliChainParams } from '@/constants/chains'
import { SVGS } from '@/assets'

import { Button, ButtonEnum } from '../Button'
import { BaseModal } from '../Modal'
import { StyledConnectContent, WalletButtonsWrapper } from './styled'

const ConnectWallet = ({ ...props }) => {
  const { authenticate, isAuthing, isVerifying } = useAuth()
  const { isActive, provider } = useWeb3React()
  const [show, setShow] = useState(false)
  const [activated, setActivated] = useState(false)

  const connectAndAuthenticate = async (
    connectorType: 'coinbase' | 'walletconnect' | 'metamask'
  ) => {
    try {
      if (connectorType === 'metamask' && !isActive) {
        await metamask.activate?.(
          import.meta.env.VITE_NETWORK_TYPE === 'testnet'
            ? { ...arbitrumGoerliChainParams, rpcUrls: [import.meta.env.VITE_FARE_RPC_URL] }
            : testChainParams
        )
      }
      if (connectorType === 'walletconnect' && !isActive) {
        await walletConnect?.activate?.(51337)
      }
      if (connectorType === 'coinbase' && !isActive) {
        await coinbaseWallet.activate(
          import.meta.env.VITE_NETWORK_TYPE === 'testnet'
            ? { ...arbitrumGoerliChainParams, rpcUrls: [import.meta.env.VITE_FARE_RPC_URL] }
            : testChainParams
        )
      }
    } catch (err) {
      console.error(err)
    } finally {
      setActivated(true)
      setShow(false)
    }
  }

  useEffect(() => {
    if (isActive && activated) {
      authenticate()
      setActivated(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, provider, activated])

  return (
    <>
      <BaseModal
        show={show}
        setShow={setShow}
        title={'Connect wallet'}
        noPadding
        content={
          <WalletButtonsWrapper>
            <Button
              buttonType={0}
              disabled={isAuthing}
              isLoading={isAuthing}
              onClick={() => connectAndAuthenticate('metamask')}
            >
              <StyledConnectContent>
                <img src={SVGS.metamaskIcon} height={20} width={20} alt="Metamask" /> Metamask
              </StyledConnectContent>
            </Button>
            <Button
              buttonType={0}
              disabled={isAuthing}
              isLoading={isAuthing}
              onClick={() => connectAndAuthenticate('walletconnect')}
            >
              <StyledConnectContent>
                <img src={SVGS.walletConnectIcon} height={24} width={24} alt="Wallet connect" />
                Wallet connect
              </StyledConnectContent>
            </Button>
            {/* <Button
              buttonType={0}
              disabled={isAuthing}
              isLoading={isAuthing}
              onClick={() => connectAndAuthenticate('coinbase')}
            >
              Coinbase
            </Button> */}
          </WalletButtonsWrapper>
        }
      />
      <Button
        buttonType={ButtonEnum.CONNECT_WALLET}
        disabled={isAuthing || isVerifying}
        onClick={() => setShow(true)}
        isLoading={isAuthing}
        loadingText={isAuthing ? 'CONNECTING' : 'VERIFYING'}
        {...props}
      >
        Connect wallet
      </Button>
    </>
  )
}

export default ConnectWallet
