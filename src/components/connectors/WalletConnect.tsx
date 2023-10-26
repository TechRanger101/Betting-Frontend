import { URI_AVAILABLE } from '@web3-react/walletconnect'

import { walletConnect, walletConnectHooks } from '../../lib/crypto/connectors'
import { SupportedChainId } from '../../constants/web3'

const { useChainId, useAccounts, useIsActivating, useIsActive } = walletConnectHooks

const WalletConnect = () => {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActiving = useIsActivating()
  const isActive = useIsActive()

  useEffect(() => {
    walletConnect.events.on(URI_AVAILABLE, (uri: string) => {
      console.log(`uri: ${uri}`)
    })
  }, [])

  // useEffect(() => {
  //   void walletConnect
  //     .connectEagerly()
  //     .catch(() => console.debug('Failed to connect eagerly to coinbase wallet'))
  // }, [])

  const toggleConnection = useCallback(async () => {
    try {
      if (isActive) {
        await walletConnect.resetState()
        walletConnect.deactivate?.()
      } else {
        await walletConnect.activate(SupportedChainId.MAINNET)
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
      <h4>Wallet Connect</h4>
      <div>Chain Id: {chainId}</div>
      <div>Accounts: {JSON.stringify(accounts || [])}</div>
      <div>Activing: {String(isActiving)}</div>
      <div>Active: {String(isActive)}</div>
      {connectorBtnElem}
    </div>
  )
}

export default WalletConnect
