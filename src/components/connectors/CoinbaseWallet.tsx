import { coinbaseWallet, coinbaseWalletHooks } from '../../lib/crypto/connectors'
import { SupportedChainId } from '../../constants/web3'

const { useChainId, useAccounts, useIsActivating, useIsActive } = coinbaseWalletHooks

const CoinbaseWallet = () => {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActiving = useIsActivating()
  const isActive = useIsActive()

  // useEffect(() => {
  //   void coinbaseWallet
  //     .connectEagerly()
  //     .catch(() => console.debug('Failed to connect eagerly to coinbase wallet'))
  // }, [])

  const toggleConnection = useCallback(async () => {
    try {
      if (isActive) {
        await coinbaseWallet.resetState()
        coinbaseWallet.deactivate?.()
      } else {
        await coinbaseWallet.activate(SupportedChainId.AVALANCHE)
      }
    } catch (error) {
      console.error(error)
    }
  }, [isActive])

  const connectorBtnElem = useMemo(() => {
    return <button onClick={toggleConnection}>{isActive ? 'Deactivate' : 'Activate'}</button>
  }, [isActive, toggleConnection])

  return (
    <div>
      <h4>Coinbase Wallet</h4>
      <div>Chain Id: {chainId}</div>
      <div>Accounts: {JSON.stringify(accounts || [])}</div>
      <div>Activing: {String(isActiving)}</div>
      <div>Active: {String(isActive)}</div>
      {connectorBtnElem}
    </div>
  )
}

export default CoinbaseWallet
