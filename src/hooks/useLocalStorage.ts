import { getJsonLocalStorage } from '@/utils/window'
import usePrevious from './usePrevious'

/** References a localStorage value and two way data binds the value with React state */
function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T | null, (val: T | null) => void, () => void] {
  const [value, setValue] = useState<T | null>(getJsonLocalStorage<T>(key) || defaultValue)
  const prevValue = usePrevious(value)

  const remove = useCallback(() => {
    localStorage.removeItem(key)
    setValue(null)
  }, [key, setValue])

  const setStorageValue = useCallback(
    (newValue: T | null) => {
      localStorage.setItem(key, JSON.stringify(newValue || ''))
      setValue(newValue)
    },
    [key]
  )

  useEffect(() => {
    const handleChange = () => {
      const storageValue = getJsonLocalStorage<T>(key)
      if (value !== storageValue) setValue(getJsonLocalStorage<T>(key))
    }
    window.addEventListener('storage', handleChange)
    return () => window.removeEventListener('storage', handleChange)
  }, [value, prevValue, key])

  return [value, setStorageValue, remove]
}

export default useLocalStorage
