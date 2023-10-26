import Metamask from '../connectors/Metamask'
import CoinbaseWallet from '../connectors/CoinbaseWallet'
import WalletConnect from '../connectors/WalletConnect'
import useAuth from '../../hooks/useAuth'

const SWalletAuth = styled.div`
  display: flex;
`

const WalletAuth = () => {
  const { authenticate, logout, isAuthed } = useAuth()

  const authBtnElem = useMemo(() => {
    return (
      <button onClick={isAuthed ? logout : authenticate}>
        {isAuthed ? 'Logout1' : 'Authenticate'}
      </button>
    )
  }, [authenticate, logout, isAuthed])

  return (
    <>
      {authBtnElem}
      <SWalletAuth id="wallet-auth">
        <Metamask />
        <CoinbaseWallet />
        <WalletConnect />
      </SWalletAuth>
    </>
  )
}

export default WalletAuth
