import React, { useState, memo, useCallback, useEffect, useRef, useMemo } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Vibration } from 'react-native'
import useInterval from '../../hooks/useInterval'
import DisplayTime from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States, StateActions } from '../../types/state'
import { Container } from '../../components/Containers'
import TimerForm from './TimerForm'
import { mainColors } from '../../theme'
import { AlertType } from '../Alert/types'
import { VIBRATION_PATTERN_ALERT } from './types'

interface Props {
  setLoops: React.Dispatch<React.SetStateAction<number[]>>
  setDone: React.Dispatch<React.SetStateAction<boolean>>
  alert?: AlertType
}

const Countdown: React.FC<Props> = ({ setLoops, setDone, alert }) => {
  const [time, setTime] = useState(0)
  const [maxTime, setMaxTime] = useState(0)
  const [{ status }, dispatch] = useController()
  const lastStep = useRef(0)

  const isFinished = useMemo(() => status === States.RESETED || status === States.STOPPED, [status])

  useEffect(() => {
    if (alert && time > 0) {
      if (isFinished) {
        lastStep.current = maxTime - alert.step
      } else if (lastStep.current === 0) {
        lastStep.current = time - alert.step
      } else {
        lastStep.current = time - alert.step - 1
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert])

  useInterval(
    () => {
      if (lastStep.current > 0 && time - 1 === lastStep.current) {
        setDone(true)
        Vibration.vibrate(VIBRATION_PATTERN_ALERT)
      }

      if (time - 1 === 0) {
        dispatch({ type: StateActions.STOP })
        setTime(maxTime)
      } else {
        setTime(time - 1)
      }
    },
    status === States.STARTED ? 1000 : undefined,
  )

  useEffect(() => {
    if (status === States.RESETED) {
      dispatch({ type: StateActions.STOP })
    }
  }, [status, dispatch])

  const onPlay = useCallback((seconds: number) => {
    setTime(seconds)
    setMaxTime(seconds)
  }, [])

  const resetTimer = useCallback(() => {
    setTime(maxTime)
    setLoops([])
  }, [setLoops, maxTime])

  return (
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
