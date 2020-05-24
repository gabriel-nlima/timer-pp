import { useEffect, useRef } from 'react'
import BackgroundTimer from 'react-native-background-timer'
import { Platform } from 'react-native'

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export default function useInterval(callback: Function, delay?: number) {
  const savedCallback = useRef<Function>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (Platform.OS === 'android') {
      if (delay !== undefined) {
        const id = BackgroundTimer.setInterval(tick, delay)
        return () => BackgroundTimer.clearInterval(id)
      }
    } else if (Platform.OS === 'ios') {
      if (delay) {
        BackgroundTimer.start()
        const id = setInterval(tick, delay)
        return () => {
          clearInterval(id)
          BackgroundTimer.stop()
        }
      }

      BackgroundTimer.stop()
    } else if (delay !== undefined) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
