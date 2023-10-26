import shallow from 'zustand/shallow'

import useGlobalStore from '@/store/useGlobalStore'
import useCryptoStore from '@/store/useCryptoStore'
import { fareSpinAddress } from '@/lib/crypto'
import useSpinStore from '@/store/useSpinStore'
import { LOCAL_STORAGE } from '@/constants/utils'

import useAuth from './useAuth'

const useSpinRoom = () => {
  const { isConnected, setIsConnected } = useGlobalStore(state => ({
    isConnected: state.isConnected,
    setIsConnected: state.setIsConnected,
  }))
  const { fareTokenContract } = useCryptoStore(
    state => ({ fareTokenContract: state.fareTokenContract }),
    shallow
  )
  const {
    setHasApprovedMintBurn,
    setClaimableRewards,
    spinRoomWS,
    spinRoomErrMsg,
    setSpinRoomErrMsg,
  } = useSpinStore(
    state => ({
      setHasApprovedMintBurn: state.setHasApprovedMintBurn,
      setClaimableRewards: state.setClaimableRewards,
      spinRoomWS: state.spinRoomWS,
      spinRoomErrMsg: state.spinRoomErrMsg,
      setSpinRoomErrMsg: state.setSpinRoomErrMsg,
    }),
    shallow
  )

  const { verify, authToken, authPublicAddress } = useAuth()

  const join = useCallback(async () => {
    setSpinRoomErrMsg('')
    const token = localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN) || authToken

    try {
      const verifyInfo = await verify()

      if (isConnected || !spinRoomWS) return
      await spinRoomWS.join(token, verifyInfo?.authenticatedPublicKey)
    } catch (error) {
      console.log(error)
      setSpinRoomErrMsg(String(error))
    }
  }, [authToken, setSpinRoomErrMsg, spinRoomWS, isConnected, verify])

  const leave = useCallback(async () => {
    setSpinRoomErrMsg('')
    try {
      if (!spinRoomWS) return

      await spinRoomWS.leave()
    } catch (error) {
      console.log(error)
      setSpinRoomErrMsg(String(error))
    }
  }, [setSpinRoomErrMsg, spinRoomWS])

  const checkHasApprovedSpin = useCallback(async () => {
    if (!authPublicAddress || !fareTokenContract) return
    const didAllow = await fareTokenContract?.didUserAllowContract(
      authPublicAddress,
      fareSpinAddress
    )
    setHasApprovedMintBurn(Boolean(didAllow))
  }, [authPublicAddress, fareTokenContract, setHasApprovedMintBurn])

  useEffect(() => {
    checkHasApprovedSpin()
  }, [checkHasApprovedSpin])

  return useMemo(
    () => ({
      spinRoomErrMsg,
      spinRoomWS,
      join,
      leave,
      setClaimableRewards,
    }),
    [spinRoomErrMsg, spinRoomWS, join, leave, setClaimableRewards]
  )
}

export default useSpinRoom

// useDebounce(
//   () => {
//     if (!spinRoomWS) {
//       return
//     }

//     const token = authToken || localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN) || ''
//     ;(async () => {
//       if (token && isWeb3Active) {
//         try {
//           const verifyInfo = await verify()

//           if (!verifyInfo || !verifyInfo.isValid) {
//             throw new Error('AuthToken verification failed.')
//           }

//           await spinRoomWS.join(token, verifyInfo.authenticatedPublicKey)
//         } catch (err) {
//           await spinRoomWS.join(token)
//           console.warn(err)
//         }
//       } else {
//         spinRoomWS.join(token)
//       }
//     })()

//     return () => {
//       spinRoomWS.leave()
//     }
//   },
//   100,
//   [spinRoomWS, authToken, verify, isWeb3Active]
// )

// useEffect(() => {
//   // if (!authToken) return setClaimableRewards([])
//   if (!authToken || !isWeb3Active || !authPublicAddress) return setClaimableRewards([])
//   ;(async () => {
//     const claimableRewards = await fetchClaimableRewards(authToken)
//     setClaimableRewards(claimableRewards)
//   })()
// }, [authToken, setClaimableRewards, isWeb3Active, authPublicAddress])
