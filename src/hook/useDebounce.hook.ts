import { useEffect, useState } from "react"


const useDebounceF = <T,>(time: number, init?: T) => {
  const [debounced, setDebounced] = useState<T>(init!)
  const [current, setCurrent] = useState<T>(init!)

  const handleSet = (value: T) => {
    setCurrent(value)
  }

  useEffect(() => {
    const idtimeout = setTimeout(() => {
      setDebounced(current)
    }, time)

    return () => {
      clearTimeout(idtimeout)
    }

  }, [current])

  return { set: handleSet, current, value: debounced }
}

export const useDebounce = Object.assign(useDebounceF, {
  SEG: 1000,
})