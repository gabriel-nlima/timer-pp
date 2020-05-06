import React, { useState, memo, useMemo, useCallback } from 'react'
import useInterval from '../../hooks/useInterval'
import DisplayTime, { DisplayLoop } from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States, StateActions } from '../../types/state'
import { Container } from '../../components/Containers'
import TimerForm from './TimerForm'
import { MainTitle } from '../../components/Texts'

const Countdown: React.FC = () => {
  const [time, setTime] = useState(0)
  const [loops, setLoops] = useState<number[]>([])
  const [{ status }, dispatch] = useController()

  const isPlaying = useMemo(() => status === States.PLAYING, [status])

  useInterval(
    () => {
      setTime(prevTime => {
        if (prevTime - 1 === 0) {
          dispatch({ type: StateActions.PAUSE })
          return 0
        }
        return prevTime - 1
      })
    },
    isPlaying ? 1000 : undefined,
  )

  const resetTimer = useCallback(() => {
    setTime(0)
    setLoops([])
  }, [])

  return (
    <Container>
      <Container align="center">
        <MainTitle>Contagem Regressiva</MainTitle>
      </Container>
      <DisplayTime time={time} />
      <TimerForm
        setTime={setTime}
        isReverse
        resetTimer={resetTimer}
        onClickLoop={() => setLoops(prev => [time, ...prev])}
      />
      {loops.map((loop, idx) => (
        <DisplayLoop key={idx} time={loop} />
      ))}
    </Container>
  )
}

export default memo(Countdown)
