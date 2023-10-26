import { useWeb3React } from '@web3-react/core'
// import { useEffectOnce } from 'react-use'
// import { metamask } from '@/lib/crypto/connectors'

import { coinbaseWallet, metamask, walletConnect } from '@/lib/crypto/connectors'
import { testChainParams, arbitrumGoerliChainParams } from '@/constants/chains'
import { createAuthApi } from '@/lib/http/auth'
import useAuthStore from '@/store/useAuthStore'
import usePrevious from '@/hooks/usePrevious'
import { useToast } from '@/hooks/useToast'

import { LOCAL_STORAGE } from '@/constants/utils'
interface AuthProps {
  connectortType?: 'coinbase' | 'walletconnect' | 'metamask'
}

interface SignError extends Error {
  reason: string
}
// TODO: Implement authStore for this hook. Just returning the methods for the time being.
const useAuth = () => {
  const { isActive, provider, account } = useWeb3React()
  const authApi = useMemo(() => createAuthApi(provider), [provider])
  const { addToast } = useToast()
  const {
    authPublicAddress,
    setAuthPublicAddress,
    authToken,
    setAuthToken,
    removeAuthToken,
    isAuthing,
    isVerifying,
    setIsAuthing,
    setIsVerifying,
    username,
    setUsername,
  } = useAuthStore()

  const prevAuthToken = usePrevious(authToken)

  const authenticate = useCallback(async () => {
    try {
      if (isAuthing) return
      if (typeof window !== 'undefined') {
        if (typeof window.ethereum === 'undefined')
          addToast({
            header: `Wallet Extension not installed`,
            type: 'error',
            timeout: 5000,
          })
      }
      setIsAuthing(true)
      if (provider) {
        const { publicAddress, authToken, username } = await authApi.authenticate(account)
        setAuthToken(authToken)
        setAuthPublicAddress(publicAddress)
        setUsername(username)
      }
    } catch (error) {
      addToast({
        header: (error as SignError).message,
        type: 'error',
        timeout: 4000,
      })
      throw new Error((error as Error).message)
    } finally {
      setIsAuthing(false)
    }
  }, [authApi, setAuthToken, setAuthPublicAddress, setIsAuthing, isAuthing, setUsername, provider])

  const deactivateWallet = useCallback(async () => {
    if (!isActive) return
    await metamask.deactivate?.()
    await walletConnect?.deactivate?.()
    await metamask.resetState?.()
    await walletConnect?.resetState?.()
  }, [isActive])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      removeAuthToken()
      localStorage.removeItem(LOCAL_STORAGE.HAS_CONNECTED_PREV)
      await deactivateWallet()
      setAuthToken('')
      setAuthPublicAddress('')
      // location.reload()
      window.location.href = '/'
    }
  }, [setAuthToken, authApi, removeAuthToken, setAuthPublicAddress, deactivateWallet, authToken])

  const verify = useCallback(async () => {
    try {
      setIsVerifying(true)
      const resp = await authApi.verifyAuthToken(authToken)
      if (resp?.isValid) {
        setAuthPublicAddress(resp?.authenticatedPublicKey)
        setUsername(resp.username)
        return resp
      } else {
      }
    } catch (error) {
      setAuthPublicAddress('')
      removeAuthToken()
      console.warn(error, 'hey')
      // return error
    } finally {
      setIsVerifying(false)
    }
  }, [
    authApi,
    removeAuthToken,
    authToken,
    setAuthPublicAddress,
    deactivateWallet,
    setIsVerifying,
    setUsername,
  ])

  return useMemo(
    () => ({
      authPublicAddress,
      setAuthPublicAddress,
      account,
      provider,
      authApi,
      verify,
      authenticate,
      logout,
      authToken,
      prevAuthToken,
      setAuthToken,
      removeAuthToken,
      isWeb3Active: isActive,
      isAuthed: !!authToken,
      isAuthing,
      isVerifying,
      username,
      setUsername,
    }),
    [
      authPublicAddress,
      setAuthPublicAddress,
      isActive,
      authApi,
      authToken,
      authenticate,
      logout,
      prevAuthToken,
      removeAuthToken,
      setAuthToken,
      verify,
      provider,
      account,
      isAuthing,
      isVerifying,
      username,
      setUsername,
      provider,
    ]
  )
}

export default useAuth
