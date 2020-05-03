import React, { useState, memo, useMemo, useCallback } from 'react'
import { Button } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import useInterval from '../../hooks/useInterval'
import DisplayTime from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States, StateActions } from '../../types/state'
import { MainContainer } from '../../components/Containers'
import TimerForm from './TimerForm'
import { DrawerScreens, TimerModes } from '../../types/navigation'

export interface TimeObj {
  hours: string
  minutes: string
  seconds: string
}

type TimerScreenProps = RouteProp<DrawerScreens, 'Cron' | 'Timer' | 'Countdown'>
type Props = {
  route: TimerScreenProps
}

// TODO Este componente renderiza a cada segundo, portando
// removar um pouco de lógica/funcionalidades para fora deste componente
// e deixar cuidando apenas do tempo, para evitar delays.
const Timer: React.FC<Props> = ({ route }) => {
  const [time, setTime] = useState(0)
  const [maxTime, setMaxTime] = useState(0)
  const [loops, setLoops] = useState<number[]>([])
  const [{ status }, dispatch] = useController()
  const { mode } = route.params

  const isReverse = useMemo(() => mode === TimerModes.COUNTDOWN, [mode])

  const isPlaying = useMemo(() => status === States.PLAYING, [status])

  useInterval(
    () => {
      setTime(prevTime => {
        if (isReverse && prevTime - 1 === 0) {
          dispatch({ type: StateActions.PAUSE })
          return 0
        }
        if (!isReverse && maxTime > 0 && maxTime === prevTime + 1) {
          dispatch({ type: StateActions.PAUSE })
          return maxTime
        }
        return isReverse ? (prevTime >= 1 ? prevTime - 1 : 0) : prevTime + 1
      })
    },
    isPlaying ? 1000 : undefined,
  )

  const onPlay = useCallback(() => {
    dispatch({ type: isPlaying ? StateActions.PAUSE : StateActions.PLAY })
  }, [dispatch, isPlaying])

  const resetTimer = useCallback(() => {
    dispatch({ type: StateActions.RESET })
    setTime(0)
    setLoops([])
  }, [dispatch])

  return (
    <MainContainer>
      {/* {isPlaying ? (
        <DisplayTime time={time} />
      ) : (
        <TimerForm
          reverse={reverse}
          setReverse={setReverse}
          setMaxTime={setMaxTime}
          setTime={setTime}
        />
      )} */}

      {mode === TimerModes.CRON ? (
        <>
          <DisplayTime time={time} />
          <Button onPress={onPlay} title={isPlaying ? 'Pause' : 'Play'} />
        </>
      ) : isPlaying ? (
        <DisplayTime time={time} />
      ) : (
        <TimerForm setMaxTime={setMaxTime} setTime={setTime} isReverse={isReverse} />
      )}

      {isPlaying && (
        <>
          <Button
            onPress={() => setLoops(prev => [time, ...prev])}
            disabled={!isPlaying}
            title="Volta"
          />
          <Button onPress={resetTimer} disabled={!isPlaying} title="Reset" />
        </>
      )}
      {loops.map((loop, idx) => (
        <DisplayTime key={idx} time={loop} />
      ))}
    </MainContainer>
  )
}

export default memo(Timer)
