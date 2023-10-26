// Components
import { Button, ButtonEnum } from '@/components/shared/Button'
import { ReactComponent as DisconnectIcon } from '@/assets/svg/disconnect.svg'
const SLostConnectionPage = styled.div`
  grid-column: 1 / span 2;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const LostConnectionPage = ({ reconnect }: { reconnect: any }) => {
  const [isReconnecting, setIsReconnecting] = useState(false)
  const onReconnect = async () => {
    if (isReconnecting) return
    setIsReconnecting(true)
    try {
      await reconnect()
    } catch (err) {
      console.error(err)
    } finally {
      setIsReconnecting(false)
    }
  }

  return (
    <SLostConnectionPage>
      <DisconnectIcon />
      <h3>DISCONNECTED FROM SPIN</h3>
      <Button
        disabled={isReconnecting}
        onClick={onReconnect}
        buttonType={ButtonEnum.CONNECT_WALLET}
        loadingText={'Reconnecting'}
        isLoading={isReconnecting}
      >
        Reconnect
      </Button>
    </SLostConnectionPage>
  )
}

export default LostConnectionPage
