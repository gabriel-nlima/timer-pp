import React, { useState, memo, useMemo, useCallback } from 'react'
import useInterval from '../../hooks/useInterval'
import DisplayTime, { DisplayLoop } from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States, StateActions } from '../../types/state'
import { MainContainer, Container } from '../../components/Containers'
import TimerForm from './TimerForm'
import { MainTitle } from '../../components/Texts'

const Timer: React.FC = () => {
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
      <Container align="center">
        <MainTitle>Timer</MainTitle>
      </Container>
      <DisplayTime time={time} />
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
    </MainContainer>
  )
}

export default memo(Timer)
