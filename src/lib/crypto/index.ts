import { type Web3Provider } from '@ethersproject/providers'
import { type providers, utils } from 'ethers'
import { revertReasonList } from '@/lib/crypto/revertReasons'

export const windowEth: providers.ExternalProvider = window.ethereum

export const getRevertReasonFromTx = async (txHash: string, provider: Web3Provider) => {
  const tx = await provider.getTransaction(txHash)
  const rec = await tx.wait()
  if (!tx) {
    return 'Tx not found'
  } else {
    const code = await provider.call(rec, rec.blockNumber)
    const reason = utils.toUtf8String(`0x${code.substring(138)}`)
    return reason
  }
}

export const etherErrorToReadable = (errObj: any) => {
  let reason = ''

  reason = errObj.reason ?? errObj.message ?? reason
  errObj = errObj.error ?? errObj.data?.originalError

  return {
    reason,
    errObj,
  }
}

export const getTxErrorMsg = (err: any) => {
  let displayError = ''
  const readableError = etherErrorToReadable(err)

  revertReasonList.forEach(obj => {
    if (readableError.reason.includes(obj.term)) {
      displayError = obj.errMsg
    }
  })

  return displayError ?? 'Unexpected error. Please try again.'
}

export * from './contracts'
