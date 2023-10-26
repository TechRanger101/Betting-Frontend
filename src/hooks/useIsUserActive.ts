import useGlobalStore from '@/store/useGlobalStore'

// Checks if user is active interacting with the page for the past 30 minutes
function useIsUserInactive(timeout = 30 * 10 * 1000) {
  const isUserInactive = useGlobalStore(state => state.isUserInactive)
  const [hasMovedMouse, setHasMovedMouse] = useState(true)
  const [hasPressedKey, setHasPressedKey] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(true)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    const onMouseMove = () => {
      clearTimeout(timers[0])
      setHasMovedMouse(true)
      timers[0] = setTimeout(() => {
        console.log('fired')
        setHasMovedMouse(false)
      }, timeout)
    }

    const onKeydown = () => {
      clearTimeout(timers[1])
      setHasPressedKey(true)
      timers[1] = setTimeout(() => {
        console.log('fired')
        setHasPressedKey(false)
      }, timeout)
    }

    const onScroll = () => {
      clearTimeout(timers[2])
      setHasScrolled(true)
      timers[2] = setTimeout(() => {
        console.log('fired')
        setHasScrolled(false)
      }, timeout)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('keydown', onKeydown)
      window.removeEventListener('scroll', onScroll)
    }
  }, [isUserInactive, timeout])

  useEffect(() => {
    if (!hasMovedMouse || !hasPressedKey || !hasScrolled) {
      console.log('User is inactive')
      useGlobalStore.setState({ isUserInactive: true })
    } else {
      console.log('user is active')
      useGlobalStore.setState({ isUserInactive: false })
    }
  }, [hasMovedMouse, hasPressedKey, hasScrolled])

  return useMemo(() => isUserInactive, [isUserInactive])
}

export default useIsUserInactive
