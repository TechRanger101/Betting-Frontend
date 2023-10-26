import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from '@/constants/http'

export const shortenString = (str: string, startLen: number, endLen: number) => {
  if (str.length > startLen + endLen) {
    return `${str.slice(0, startLen)}...${str.slice(-endLen)}`
  }
  return str
}

export const shortenAddress = (address: string) => shortenString(address, 6, 4)
export const shorterAddress = (address: string) => shortenString(address, 4, 2)

export function ensureString(value: unknown): string {
  if (value === null || value === undefined || typeof value !== 'string') {
    return ''
  }
  return value
}

export function isValidUsername(username: string): boolean {
  // Define the regex pattern to match valid usernames
  const pattern = /^[a-zA-Z0-9-]{2,14}( [a-zA-Z0-9-]{1,14})*$/

  // Ensure the length of the username is between 4 and 16 characters
  const isValidLength =
    username.trim().length >= USERNAME_MIN_LENGTH && username.trim().length <= USERNAME_MAX_LENGTH

  // Use the test method of the RegExp object to match the pattern against the username string
  return pattern.test(username) && isValidLength
}

export const INVALID_USERNAME_MSG = `Username is invalid. Valid format: [a-zA-Z0-9_] | Min: ${USERNAME_MIN_LENGTH} | Max: ${USERNAME_MAX_LENGTH}`

export function formatTimestamp(unixTimestamp: number): string {
  // Convert the Unix timestamp to a JavaScript Date object
  const date = new Date(unixTimestamp)

  // Create a DateTimeFormat object for the user's locale
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  // Format the date and return the result
  return formatter.format(date)
}
