import shallow from 'zustand/shallow'

import useSpinStore, { type SpinStore } from '@/store/useSpinStore'
import useGlobalRefStore from '@/store/useGlobalRefStore'
import useWheelStore, { type WheelStore } from '@/store/useWheelStore'
import { GameModeLimitMap, getWheelColor, inverseGameModeMap } from '@/utils/spin'

const wheelTickCompare = (objA: WheelStore, objB: WheelStore) => {
  if (objA.tickHovered && !objB.tickHovered) {
    return false
  }
  if (!objA.tickHovered && objB.tickHovered) {
    return false
  }
  if (objA.tickHovered?.id !== objB.tickHovered?.id) {
    return false
  }

  if (objA.selectedGameMode !== objB.selectedGameMode) return false

  if (objA.isWheelSpinning !== objB.isWheelSpinning) return false

  if (objA.wheelLoaded !== objB.wheelLoaded) return false

  if (objA.spinTickId !== objB.spinTickId) return false

  if (objA.wheelLoaded !== objB.wheelLoaded) return false

  return true
}

const spinStoreCompare = (objA: SpinStore, objB: SpinStore) => {
  if (objA.entryQueue.length !== objB.entryQueue.length) return false
  if (objA.mySubmittedEntries?.entries?.length !== objB.mySubmittedEntries?.entries?.length)
    return false
  return true
}

const useWheelTick = (color: string, idx: number) => {
  const { entryQueue, mySubmittedEntries } = useSpinStore(
    state =>
      ({ entryQueue: state.entryQueue, mySubmittedEntries: state.mySubmittedEntries } as SpinStore),
    spinStoreCompare
    // shallow
  )
  const {
    selectedGameMode,
    tickSelected,
    tickHovered,
    isWheelSpinning,
    wheelLoaded,
    spinTickId,
    selectBetAmount,
  } = useWheelStore(
    state =>
      ({
        selectedGameMode: state.selectedGameMode,
        tickHovered: state.tickHovered,
        tickSelected: state.tickSelected,
        isWheelSpinning: state.isWheelSpinning,
        wheelLoaded: state.wheelLoaded,
        spinTickId: state.spinTickId,
        selectBetAmount: state.selectBetAmount,
      } as WheelStore),
    shallow
    // wheelTickCompare
  )

  const currentGameModeCount = useMemo(() => {
    return entryQueue.reduce(
      (limit, item) => (selectedGameMode === item.contractModeId ? limit + 1 : limit),
      0
    )
  }, [selectedGameMode, entryQueue])

  const isLimitReached = useMemo(
    () => currentGameModeCount >= GameModeLimitMap[selectedGameMode],
    [currentGameModeCount, selectedGameMode]
  )

  const existsInQueue = useMemo(() => {
    if (isWheelSpinning) return false
    return entryQueue.some(item => {
      return (
        getWheelColor(selectedGameMode, idx) ===
          getWheelColor(item.contractModeId, item.pickedNumber) &&
        item.contractModeId === selectedGameMode
      )
    })
    // let doesExist = false
    // entryQueue.forEach(item => {
    //   if (
    //     getWheelColor(selectedGameMode, idx) ===
    //       getWheelColor(item.contractModeId, item.pickedNumber) &&
    //     item.contractModeId === selectedGameMode
    //   )
    //     doesExist = true
    // })
    // return doesExist
  }, [entryQueue, idx, selectedGameMode, isWheelSpinning])

  const existsInSubmittedMap = useMemo(() => {
    if (!mySubmittedEntries) return
    return mySubmittedEntries.entries.some(entry => {
      const gameModeId = inverseGameModeMap(entry.contractModeId)
      return (
        getWheelColor(selectedGameMode, idx) === getWheelColor(gameModeId, entry.pickedNumber) &&
        gameModeId === selectedGameMode
      )
    })

    // let doesExist = false
    // for (const entry of submittedEntries.entries) {
    //   if (
    //     getWheelColor(selectedGameMode, idx) ===
    //       getWheelColor(entry.contractModeId as GameModeNumber, entry.pickedNumber) &&
    //     (entry.contractModeId as GameModeNumber) === selectedGameMode
    //   ) {
    //     doesExist = true
    //   }
    // }
    // return doesExist
  }, [mySubmittedEntries, idx, selectedGameMode])

  const isTickHovered = useMemo(() => tickHovered?.color === color, [color, tickHovered])

  const isTickSelected = useMemo(() => tickSelected?.color === color, [tickSelected, color])

  const onToggleSelect = useCallback(() => {
    // const selectBetAmount = useWheelStore.getState().selectBetAmount
    if (selectBetAmount <= 0) {
      useGlobalRefStore.getState().betAmountInputRef?.select()
      return
    }

    if (!wheelLoaded || isLimitReached || existsInQueue || selectBetAmount <= 0) return

    if (isTickSelected) {
      useWheelStore.setState({ tickSelected: null })
      return
    }
    useWheelStore.setState({ tickSelected: { id: idx, color } })
  }, [isTickSelected, color, idx, wheelLoaded, isLimitReached, existsInQueue, selectBetAmount])

  const onHover = useCallback(() => {
    if (
      !wheelLoaded ||
      isLimitReached ||
      existsInQueue ||
      selectBetAmount <= 0
      // useWheelStore.getState().selectBetAmount <= 0
    )
      return

    useWheelStore.setState({ tickHovered: { id: idx, color } })
  }, [color, idx, wheelLoaded, isLimitReached, existsInQueue, selectBetAmount])

  const onHoverLeave = useCallback(() => {
    if (
      !wheelLoaded ||
      isLimitReached ||
      existsInQueue ||
      selectBetAmount <= 0
      // useWheelStore.getState().selectBetAmount <= 0
    )
      return

    useWheelStore.setState({ tickHovered: null })
  }, [wheelLoaded, isLimitReached, existsInQueue, selectBetAmount])

  useEffect(() => {
    if (useWheelStore.getState().selectBetAmount === 0) {
      useWheelStore.setState({
        tickSelected: null,
        tickHovered: null,
      })
    }
  }, [])

  return useMemo(
    () => ({
      onHover,
      onHoverLeave,
      onToggleSelect,
      isTickSelected,
      isTickHovered,
      isWheelSpinning,
      wheelLoaded,
      spinTickId,
      currentGameModeCount,
      isLimitReached,
      existsInQueue,
      existsInSubmittedMap,
    }),
    [
      onHover,
      onHoverLeave,
      onToggleSelect,
      isTickSelected,
      isTickHovered,
      isWheelSpinning,
      wheelLoaded,
      spinTickId,
      currentGameModeCount,
      isLimitReached,
      existsInQueue,
      existsInSubmittedMap,
    ]
  )
}

export default useWheelTick
