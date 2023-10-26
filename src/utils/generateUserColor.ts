import { utils } from 'ethers'

const fareColorsArr = ['ffcd9e', 'ff5e4f', 'd900d5', '410dff', '4af5d3']

export const generateUserColor = (address: string) => {
  if (address) {
    // Convert the hex address to a Uint8Array
    const addressBytes = utils.arrayify(address)
    // Compute the SHA256 hash of the Uint8Array
    const hashBytes = utils.sha256(addressBytes)
    // Convert the hash bytes to a hex string
    const hashHex = utils.hexlify(hashBytes)
    // Parse the last byte of the hash as an integer
    const colorId = parseInt(hashHex.slice(-2), 16) % fareColorsArr.length

    return fareColorsArr[colorId ?? 0]
  }
}
