import type { StoreApi, UseBoundStore } from 'zustand'
import type { WithSelectors } from './types'

type State = object

const createSelectors = <S extends UseBoundStore<StoreApi<State>>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(store.use as any)[k] = () => store(s => s[k as keyof typeof s])
  }

  return store
}

export default createSelectors
