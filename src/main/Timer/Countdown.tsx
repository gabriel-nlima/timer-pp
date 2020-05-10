import React, { useState, memo, useMemo, useCallback } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import useInterval from '../../hooks/useInterval'
import DisplayTime from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States, StateActions } from '../../types/state'
import { Container } from '../../components/Containers'
import TimerForm from './TimerForm'
import { mainColors } from '../../theme'

interface Props {
  setLoops: React.Dispatch<React.SetStateAction<number[]>>
}

const Countdown: React.FC<Props> = ({ setLoops }) => {
  const [time, setTime] = useState(0)
  const [maxTime, setMaxTime] = useState(0)
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

  const onPlay = useCallback((seconds: number) => {
    setTime(seconds)
    setMaxTime(seconds)
  }, [])

  const resetTimer = useCallback(() => {
    setTime(0)
    setLoops([])
  }, [setLoops])

  return (
    <Container>
      <AnimatedCircularProgress
        size={250}
        width={6}
        tintColor={mainColors.lightBLue}
        fill={maxTime > 0 ? (time / maxTime) * 100 : 0}
        backgroundColor={mainColors.lightGrey}
        rotation={180}
      >
        {() => <DisplayTime time={time} />}
      </AnimatedCircularProgress>
      <TimerForm
        setTime={setTime}
        isReverse
        resetTimer={resetTimer}
        onClickLoop={() => setLoops(prev => [time, ...prev])}
        onPlayInReverse={onPlay}
      />
    </Container>
  )
}

export default memo(Countdown)
