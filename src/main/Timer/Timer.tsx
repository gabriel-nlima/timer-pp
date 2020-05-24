import React, { useState, memo, useCallback, useEffect, useRef, useMemo } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Vibration } from 'react-native'
import BackgroundTimer from 'react-native-background-timer'
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
const Timer: React.FC<Props> = ({ setLoops, setDone, alert }) => {
  const [time, setTime] = useState(0)
  const [maxTime, setMaxTime] = useState(0)
  const lastStep = useRef(0)
  const [{ status }, dispatch] = useController()

  const isFinished = useMemo(() => status === States.RESETED || status === States.STOPPED, [status])

  useEffect(() => {
    if (alert) {
      if (isFinished) {
        lastStep.current = alert.step
      } else if (lastStep.current === 0) {
        lastStep.current = time + alert.step
      } else {
        lastStep.current = time + alert.step + 1
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert])

  useEffect(() => {
    if (status === States.RESETED) {
      dispatch({ type: StateActions.STOP })
    }
  }, [status, dispatch])

  useInterval(
    () => {
      if (lastStep.current > 0 && time + 1 === lastStep.current) {
        setDone(true)
        Vibration.vibrate(VIBRATION_PATTERN_ALERT)
      }

      if (maxTime > 0 && maxTime === time + 1) {
        dispatch({ type: StateActions.STOP })
        setTime(maxTime)
        BackgroundTimer.stopBackgroundTimer()
      } else {
        setTime(time + 1)
      }
    },
    status === States.STARTED ? 1000 : undefined,
  )

  const resetTimer = useCallback(() => {
    setTime(0)
    setLoops([])
  }, [setLoops])

  return (
    <Container align="center">
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
    </Container>
  )
}

export default memo(Timer)
