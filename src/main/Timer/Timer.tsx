import React, { useState, memo, useMemo, useCallback } from 'react'
import { RouteProp } from '@react-navigation/native'
import useInterval from '../../hooks/useInterval'
import DisplayTime from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States, StateActions } from '../../types/state'
import { MainContainer } from '../../components/Containers'
import TimerForm from './TimerForm'
import { DrawerScreens } from '../../types/navigation'

export interface TimeObj {
  hours: string
  minutes: string
  seconds: string
}

type TimerScreenProps = RouteProp<DrawerScreens, 'Cron' | 'Timer' | 'Countdown'>
type Props = {
  route: TimerScreenProps
}

const Timer: React.FC<Props> = () => {
  const [time, setTime] = useState(0)
  const [maxTime, setMaxTime] = useState(0)
  const [loops, setLoops] = useState<number[]>([])
  const [{ status }, dispatch] = useController()

  const isPlaying = useMemo(() => status === States.PLAYING, [status])

  useInterval(
    () => {
      setTime(prevTime => {
        // if (isReverse && prevTime - 1 === 0) {
        //   dispatch({ type: StateActions.PAUSE })
        //   return 0
        // }
        if (maxTime > 0 && maxTime === prevTime + 1) {
          dispatch({ type: StateActions.PAUSE })
          return maxTime
        }
        return prevTime + 1
      })
    },
    isPlaying ? 1000 : undefined,
  )

  const resetTimer = useCallback(() => {
    setTime(0)
    setLoops([])
  }, [])

  return (
    <MainContainer>
      <DisplayTime time={time} />
      <TimerForm
        setMaxTime={setMaxTime}
        setTime={setTime}
        isReverse={false}
        resetTimer={resetTimer}
        onClickLoop={() => setLoops(prev => [time, ...prev])}
      />
      {loops.map((loop, idx) => (
        <DisplayTime key={idx} time={loop} />
      ))}
    </MainContainer>
  )
}

export default memo(Timer)
