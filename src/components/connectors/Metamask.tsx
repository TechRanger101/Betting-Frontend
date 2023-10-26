import { metamask, metamaskHooks } from '../../lib/crypto/connectors'
import { SupportedChainId } from '../../constants/web3'

const { useChainId, useAccounts, useIsActivating, useIsActive } = metamaskHooks

const Metamask = () => {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActiving = useIsActivating()
  const isActive = useIsActive()

  // TODO: Need to make this dynamic depending on authToken
  useEffect(() => {
    void metamask
      .connectEagerly()
      .catch(() => console.debug('Failed to connect eagerly to coinbase wallet'))
  }, [])

  const toggleConnection = useCallback(async () => {
    try {
      if (isActive) {
        await metamask.resetState()
        await metamask.deactivate?.()
      } else {
        await metamask.activate(SupportedChainId.LOCAL_HARDHAT)
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
      <h4>Metamask</h4>
      <div>Chain Id: {chainId}</div>
      <div>Accounts: {JSON.stringify(accounts || [])}</div>
      <div>Activing: {String(isActiving)}</div>
      <div>Active: {String(isActive)}</div>
      {connectorBtnElem}
    </div>
  )
}

export default Metamask
