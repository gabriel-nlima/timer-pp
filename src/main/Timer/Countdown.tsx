import React, { useState, memo, useMemo, useCallback } from 'react'
import useInterval from '../../hooks/useInterval'
import DisplayTime, { DisplayLoop } from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States, StateActions } from '../../types/state'
import { Container } from '../../components/Containers'
import TimerForm from './TimerForm'

interface Props {
  setLoops: React.Dispatch<React.SetStateAction<number[]>>
}

const Countdown: React.FC<Props> = ({ setLoops }) => {
  const [time, setTime] = useState(0)
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
  }, [setLoops])

  return (
    <Container>
      <DisplayTime time={time} />
      <TimerForm
        setTime={setTime}
        isReverse
        resetTimer={resetTimer}
        onClickLoop={() => setLoops(prev => [time, ...prev])}
      />
    </Container>
  )
}

export default memo(Countdown)
