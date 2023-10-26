import type { DataChange } from '@colyseus/schema'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseChanges = (changes: DataChange<any>[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload: Record<string, any> = {}
  changes.forEach(change => {
    const { field, value } = change
    payload[field] = value
  })
  return payload
}
