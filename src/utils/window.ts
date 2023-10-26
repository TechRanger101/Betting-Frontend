export const getJsonLocalStorage = <T>(key: string): T | null => {
  try {
    return JSON.parse(localStorage.getItem(key) || '') as T
  } catch (error) {
    // console.warn('getJsonLocalStorage could not parse item')
    localStorage.removeItem(key)
    return null
  }
}
