import React, { useState, memo, useMemo, useCallback } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import useInterval from '../../hooks/useInterval'
import DisplayTime, { DisplayLoop } from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States, StateActions } from '../../types/state'
import { Container } from '../../components/Containers'
import TimerForm from './TimerForm'
import { mainColors } from '../../theme'

const Timer: React.FC = () => {
  const [time, setTime] = useState(0)
  const [maxTime, setMaxTime] = useState(0)
  const [loops, setLoops] = useState<number[]>([])
  const [{ status }, dispatch] = useController()

  const isPlaying = useMemo(() => status === States.PLAYING, [status])

  useInterval(
    () => {
      setTime(prevTime => {
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
    <Container align="center" mainContent>
      <Container>
        <AnimatedCircularProgress
          size={280}
          width={6}
          tintColor={mainColors.lightBLue}
          fill={maxTime > 0 ? (time / maxTime) * 100 : 0}
          backgroundColor={mainColors.lightGrey}
          rotation={180}
        >
          {() => <DisplayTime time={time} />}
        </AnimatedCircularProgress>
      </Container>
      <TimerForm
        setMaxTime={setMaxTime}
        setTime={setTime}
        isReverse={false}
        resetTimer={resetTimer}
        onClickLoop={() => setLoops(prev => [time, ...prev])}
      />
      {loops.map((loop, idx) => (
        <DisplayLoop key={idx} time={loop} />
      ))}
    </Container>
  )
}

export default memo(Timer)
