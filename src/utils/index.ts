export function between(x: number, min: number, max: number) {
  return x >= min && x <= max
}

export const debounce = (fn: any, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}
