import { useState, useEffect, useRef } from 'react'

export function useCounter(end, { duration = 1500, enabled = true } = {}) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!enabled || started.current) return
    started.current = true

    const startTime = performance.now()
    const startValue = 0

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(startValue + (end - startValue) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [end, duration, enabled])

  return count
}
