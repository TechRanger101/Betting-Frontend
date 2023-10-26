import { useWeb3React } from '@web3-react/core'
import { utils } from 'ethers'
import shallow from 'zustand/shallow'

import useCryptoStore from '@/store/useCryptoStore'
import useAuthStore from '@/store/useAuthStore'
import {
  getFareSpinContract,
  getFareTokenContract,
  getFareBalance as fetchFareBalance,
} from '@/lib/crypto'

const useCrypto = () => {
  const { provider, isActive } = useWeb3React()
  const { authToken, authPublicAddress } = useAuthStore(
    state => ({
      authPublicAddress: state.authPublicAddress,
      authToken: state.authToken,
    }),
    shallow
  )
  const {
    fareBalance,
    ethBalance,
    setFareBalance,
    setEthBalance,
    fareSpinContract,
    fareTokenContract,
    setFareSpinContract,
    setFareTokenContract,
  } = useCryptoStore(
    state => ({
      ethBalance: state.ethBalance,
      fareBalance: state.fareBalance,
      setFareBalance: state.setFareBalance,
      setEthBalance: state.setEthBalance,
      fareSpinContract: state.fareSpinContract,
      fareTokenContract: state.fareTokenContract,
      setFareTokenContract: state.setFareTokenContract,
      setFareSpinContract: state.setFareSpinContract,
    }),
    shallow
  )

  useEffect(() => {
    setFareTokenContract(getFareTokenContract(provider))
  }, [provider, setFareTokenContract])

  useEffect(() => {
    setFareSpinContract(getFareSpinContract(provider))
  }, [provider, setFareSpinContract])

  const getFareBalance = useCallback(
    async (pubKey: string) => {
      if (!fareTokenContract) return
      return fetchFareBalance(pubKey, fareTokenContract)
    },
    [fareTokenContract]
  )

  useEffect(() => {
    if (!provider || !authPublicAddress || !fareTokenContract || !authToken || !isActive) return

    provider.pollingInterval = 3000
    provider.on('block', async () => {
      try {
        const [eth, fare] = await Promise.all([
          provider.getBalance(authPublicAddress),
          fareTokenContract.balanceOf(authPublicAddress),
        ])
        const formattedEth = utils.formatEther(eth)
        const formattedFare = utils.formatEther(fare)

        if (formattedEth !== '0.0') {
          setEthBalance(utils.formatEther(eth))
        }
        if (formattedFare !== '0.0') {
          setFareBalance(utils.formatEther(fare))
        }
      } catch (err) {
        console.warn(err)
        // await metamask.activate?.(
        //   import.meta.env.VITE_NETWORK_TYPE === 'testnet'
        //     ? arbitrumGoerliChainParams
        //     : testChainParams
        // )
        // @NOTE: If this runs into an error it's likely they are on the wrong change.
      }
    })
    return () => {
      if (provider) provider?.removeAllListeners('block')
    }
  }, [
    provider,
    fareTokenContract,
    isActive,
    setFareBalance,
    setEthBalance,
    authPublicAddress,
    authToken,
  ])

  return useMemo(
    () => ({
      fareTokenContract,
      fareSpinContract,
      getFareBalance,
      ethBalance,
      fareBalance,
      setFareBalance,
      setEthBalance,
    }),
    [
      fareTokenContract,
      fareSpinContract,
      getFareBalance,
      ethBalance,
      fareBalance,
      setFareBalance,
      setEthBalance,
    ]
  )
}

export default useCrypto
