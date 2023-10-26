import { utils } from 'ethers'
import axios from 'axios'

import { CHAIN_URLS } from '@/constants/web3'
import type { Web3Provider } from '@ethersproject/providers'
import { windowEth } from '../crypto'
import { AUTH_SIGNING_MSG, HTTP_URL } from '../../constants/http'
import { LOCAL_STORAGE } from '../../constants/utils'

const authRoute = (route: string) => `${HTTP_URL}/auth/${route}`

export const getAuthToken = (): string | null => localStorage.getItem('auth-token')

/** If error is thrown user does not have a wallet installed or enabled. */
export const createAuthApi = (provider: Web3Provider | undefined) => {
  const signMessage = async (msg: string) => {
    if (!provider) return console.error('no provider!')
    const signer = provider.getSigner()
    const signedMessage = await signer.signMessage(msg)
    if (!signedMessage) throw new Error('signMessage undefined.')

    return signedMessage
  }

  async function addAndSwitchNetwork() {
    const switchChainId = Number(import.meta.env.VITE_TEST_CHAIN_ID)
    const switchChainIdHex = '0x' + switchChainId.toString(16)
    const switchChainUrl = CHAIN_URLS[switchChainId as keyof typeof CHAIN_URLS]
    let provider = window.ethereum
    try {
      if (!window.ethereum) throw new Error('Wallet extension is not installed')
      // edge case if MM and CBW are both installed
      if (window.ethereum.providers?.length) {
        window.ethereum.providers.forEach(async (p: any) => {
          if (p.isMetaMask) provider = p
        })
      }
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: switchChainIdHex }], // Hexadecimal version of 80001, prefixed with 0x
      })
    } catch (error: any) {
      console.error(error)
      if (error.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: switchChainIdHex, // Hexadecimal version of 80001, prefixed with 0x
                chainName: 'Fare Protocol Testnet',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: [switchChainUrl],
                blockExplorerUrls: null,
                iconUrls: [''],
              },
            ],
          })

          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: switchChainIdHex }], // Hexadecimal version of 80001, prefixed with 0x
          })
        } catch (addError: any) {
          console.error(addError)
          throw new Error('User canceled network add/swtich.')
        }
      } else {
        throw new Error(error)
      }
    }
  }

  const requestAddress = async (connectortType?: 'coinbase' | 'walletconnect' | 'metamask') => {
    let provider = window.ethereum
    // edge case if MM and CBW are both installed
    if (window.ethereum.providers?.length) {
      window.ethereum.providers.forEach(async (p: any) => {
        if (p.isMetaMask && connectortType !== 'coinbase') provider = p
        // if (p.isCoinbaseWallet && connectortType === 'coinbase') provider = p
      })
    }

    const [addr] = (await provider.request({
      method: 'eth_requestAccounts',
      params: [],
    })) as string[]

    window.localStorage.setItem(LOCAL_STORAGE.HAS_CONNECTED_PREV, 'true')

    if (!addr) throw new Error('publicAddress is undefined.')

    return utils.getAddress(addr)
  }

  // @TODO Implement the ability to connect and switch between multiple wallet addresses
  // const requestAddress = async () => {
  //   if (
  //     window.ethereum &&
  //     window.localStorage.getItem(LOCAL_STORAGE.HAS_CONNECTED_PREV) !== 'true'
  //   ) {
  //     await window.ethereum.request({
  //       method: 'wallet_requestPermissions',
  //       params: [
  //         {
  //           eth_accounts: {},
  //         },
  //       ],
  //     })
  //   }
  //   // TODO: Once more wallet options are implemented, we will need to ensure this function
  //   // Isn't specific to the Metamask wallet only
  //   // const addr = await provider?.getSigner(0).getAddress()
  //   const [addr] = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[]

  //   window.localStorage.setItem(LOCAL_STORAGE.HAS_CONNECTED_PREV, 'true')

  //   if (!addr) throw new Error('publicAddress is undefined.')

  //   return addr
  // }

  const verifyAuthToken = async (authToken?: string) => {
    const token =
      authToken || (window.localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN) as string) || ''

    if (!token) return
    const { data } = await axios({
      headers: { token },
      method: 'POST',
      url: authRoute('verify-token'),
    })

    const authenticatedPublicKey = await requestAddress()
    return {
      isValid: (data.publicAddress || '').toLowerCase() === authenticatedPublicKey?.toLowerCase(),
      authenticatedPublicKey,
      username: data.username as string,
      authToken:
        (data.publicAddress || '').toLowerCase() === authenticatedPublicKey?.toLowerCase()
          ? authToken
          : '',
    }
  }

  const authenticate = async (publicAddress?: string) => {
    publicAddress = publicAddress || utils.getAddress(await requestAddress())
    const {
      data: { nonce },
    } = await axios({
      data: { publicAddress },
      method: 'POST',
      url: authRoute('generate-nonce'),
    })
    const signature = await signMessage(`${AUTH_SIGNING_MSG}${nonce}`)

    const rpcVerifyResp = await axios({
      data: { publicAddress, signature },
      method: 'POST',
      url: authRoute('verify-signature'),
    })
    const authToken: string = rpcVerifyResp.data.token
    const username: string = rpcVerifyResp.data.username
    window.localStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN, authToken)

    return { authToken, publicAddress, username }
  }

  const setUserData = async ({
    username,
    colorTheme,
  }: {
    username?: string
    colorTheme?: string
  }) => {
    const token = (window.localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN) as string) || ''
    const {
      data: { message },
    } = await axios({
      headers: { token },
      data: { username, colorTheme },
      method: 'POST',
      url: authRoute('set-user-data'),
    })
    return message
  }

  const logout = async () => {
    const token = (window.localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN) as string) || ''
    await axios({
      headers: { token },
      method: 'POST',
      url: authRoute('logout'),
    })

    window.localStorage.removeItem(LOCAL_STORAGE.AUTH_TOKEN)
  }

  return {
    noWallet: !windowEth,
    signMessage,
    requestAddress,
    verifyAuthToken,
    authenticate,
    logout,
    setUserData,
    addAndSwitchNetwork,
    provider,
  }
}
