import { useDebounce, useUnmount } from 'react-use'

import useSpinRoom from '@/hooks/useSpinRoom'
import useAuth from '@/hooks/useAuth'
import { LOCAL_STORAGE } from '@/constants/utils'
import { fetchClaimableRewards } from '@/lib/http/spin'
import LostConnectionPage from '@/pages/LostConnectionPage'

interface IMountSpinRoom {
  isConnected: boolean
  lostConnection: boolean
  isUserInactive: boolean
}

const MountSpinRoom = ({ lostConnection, isUserInactive }: IMountSpinRoom) => {
  const { verify, authToken, isWeb3Active, authPublicAddress } = useAuth()
  const { leave, spinRoomWS, setClaimableRewards } = useSpinRoom()

  const handleConnect = useCallback(async () => {
    if (!spinRoomWS) return

    let token = authToken || localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN) || ''
    let isValid = false
    if (token && isWeb3Active) {
      try {
        const verifyInfo = await verify()
        isValid = verifyInfo?.isValid || false
        token = verifyInfo?.authToken || ''

        if (!verifyInfo || !isValid) {
          throw new Error('AuthToken verification failed.')
        }

        await spinRoomWS.join(token, verifyInfo.authenticatedPublicKey)
      } catch (err) {
        await spinRoomWS.join('')
        console.warn(err)
      }
    } else {
      await spinRoomWS.join('')
    }
  }, [authToken, isWeb3Active, spinRoomWS, verify])

  const [, cancel] = useDebounce(handleConnect, 100, [handleConnect])

  // Todo: Implement logic to disconnect the user whenever 30 mins past with no activity
  useEffect(() => {
    if (isUserInactive) {
      // spinRoomWS?.leave(true)
    }
  }, [isUserInactive, spinRoomWS])

  useEffect(() => {
    // if (!authToken) return setClaimableRewards([])
    if (!authToken || !isWeb3Active || !authPublicAddress) return setClaimableRewards([])
    ;(async () => {
      const claimableRewards = await fetchClaimableRewards(authToken)
      setClaimableRewards(claimableRewards)
    })()
  }, [authToken, setClaimableRewards, isWeb3Active, authPublicAddress])

  useUnmount(() => {
    leave()
    cancel()
  })

  if (lostConnection) return <LostConnectionPage reconnect={handleConnect} />

  return null
}

export default MountSpinRoom
