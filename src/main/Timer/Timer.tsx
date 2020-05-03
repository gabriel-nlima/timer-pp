import React, { useState, memo, useMemo, useCallback, useRef } from 'react'
import { View, Button } from 'react-native'
import useInterval from '../../hooks/useInterval'
import DisplayTime from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States, StateActions } from '../../types/state'
import { Input } from '../../components/Inputs'

interface TimeObj {
  hours: string
  minutes: string
  seconds: string
}

const Timer: React.FC = () => {
  const [time, setTime] = useState(0)
  const [selectedTime, setSelectedTime] = useState<TimeObj>({
    hours: '',
    minutes: '',
    seconds: '',
  })
  const excedents = useRef({ minutes: '', hours: '' })
  const [loops, setLoops] = useState<number[]>([])
  const [{ status }, dispatch] = useController()

  const isPlaying = useMemo(() => status === States.PLAYING, [status])
  // new Date(time * 1000).toISOString().substr(11, 8)
  useInterval(
    () => {
      setTime(prevTime => prevTime + 1)
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

  const inputHandler = (value: string, key: string) => {
    if (value.length > 2) {
      switch (key) {
        case 'seconds': {
          excedents.current.minutes += value[0]
          const { minutes } = excedents.current
          if (minutes.length > 2) {
            inputHandler(minutes, 'minutes')
            setSelectedTime(prev => ({
              ...prev,
              [key]: value.substring(value.length - 2, value.length),
            }))
          } else {
            setSelectedTime(prev => ({
              ...prev,
              minutes,
              [key]: value.substring(value.length - 2, value.length),
            }))
          }
          break
        }
        case 'minutes': {
          inputHandler(value.substring(0, value.length - 2), 'hours')
          setSelectedTime(prev => ({
            ...prev,
            [key]: value.substring(value.length - 2, value.length),
          }))
          break
        }
        default:
          // hours
          setSelectedTime(prev => ({
            ...prev,
            [key]: value.substring(value.length - 2, value.length),
          }))
      }
    } else {
      setSelectedTime(prev => ({ ...prev, [key]: value }))
    }
  }

  return (
    <View>
      <DisplayTime time={time} />
      <Input
        label="Horas"
        keyProp="hours"
        value={selectedTime.hours}
        keyboardType="number-pad"
        inputHandler={inputHandler}
        editable={!isPlaying}
      />
      <Input
        label="Minutos"
        keyProp="minutes"
        value={selectedTime.minutes}
        keyboardType="number-pad"
        inputHandler={inputHandler}
        editable={!isPlaying}
      />
      <Input
        label="segundos"
        keyProp="seconds"
        value={selectedTime.seconds}
        keyboardType="number-pad"
        inputHandler={inputHandler}
        editable={!isPlaying}
      />

      <Button onPress={onPlay} title={isPlaying ? 'Pause' : 'Play'} />
      <Button
        onPress={() => setLoops(prev => [time, ...prev])}
        disabled={!isPlaying}
        title="Volta"
      />
      <Button onPress={resetTimer} disabled={!isPlaying} title="Reset" />
      {loops.map((loop, idx) => (
        <DisplayTime key={idx} time={loop} />
      ))}
    </View>
  )
}

export default memo(Timer)
