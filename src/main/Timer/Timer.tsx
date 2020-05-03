import React, { useState, memo, useMemo, useCallback, useRef } from 'react'
import { View, Button, Switch } from 'react-native'
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

// TODO Este componente renderiza a cada segundo, portando
// removar um pouco de lógica/funcionalidades para fora deste componente
// e deixar cuidando apenas do tempo, para evitar delays.
const Timer: React.FC = () => {
  const [time, setTime] = useState(0)
  const [selectedTime, setSelectedTime] = useState<TimeObj>({
    hours: '',
    minutes: '',
    seconds: '',
  })
  const [reverse, setReverse] = useState(false)
  const [maxTime, setMaxTime] = useState(0)
  const excedents = useRef('')
  const [loops, setLoops] = useState<number[]>([])
  const [{ status }, dispatch] = useController()

  const hasATimeSelected = useMemo(
    () => selectedTime.hours.length || selectedTime.minutes.length || selectedTime.seconds.length,
    [selectedTime],
  )

  const isPlaying = useMemo(() => status === States.PLAYING, [status])
  useInterval(
    () => {
      setTime(prevTime => {
        if (reverse && prevTime - 1 === 0) {
          dispatch({ type: StateActions.PAUSE })
          return 0
        }
        if (!reverse && maxTime > 0 && maxTime === prevTime + 1) {
          dispatch({ type: StateActions.PAUSE })
          return maxTime
        }
        return reverse ? (prevTime >= 1 ? prevTime - 1 : 0) : prevTime + 1
      })
    },
    isPlaying ? 1000 : undefined,
  )

  const onPlay = useCallback(() => {
    if (hasATimeSelected) {
      const { hours, minutes, seconds } = selectedTime
      const totalInSeconds = Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds)
      reverse ? setTime(totalInSeconds) : setMaxTime(totalInSeconds)
    }
    dispatch({ type: isPlaying ? StateActions.PAUSE : StateActions.PLAY })
  }, [dispatch, isPlaying, hasATimeSelected, selectedTime, reverse])

  const resetTimer = useCallback(() => {
    dispatch({ type: StateActions.RESET })
    setTime(0)
    setLoops([])
  }, [dispatch])

  // TODO O que fazer quando apagar os campos do segundos e outros estiverem preenchidos
  // Limpar o useRef excedents ao apagar campos
  // Play/Reset limpa os inputs?
  const inputHandler = (value: string, key: string) => {
    if (value.length > 2) {
      switch (key) {
        case 'seconds': {
          excedents.current += value[0]
          const minutes = excedents.current
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
        editable={false}
      />
      <Input
        label="Minutos"
        keyProp="minutes"
        value={selectedTime.minutes}
        keyboardType="number-pad"
        inputHandler={inputHandler}
        editable={false}
      />
      <Input
        label="segundos"
        keyProp="seconds"
        value={selectedTime.seconds}
        keyboardType="number-pad"
        inputHandler={inputHandler}
        editable={!isPlaying}
      />
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={reverse ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setReverse(prev => !prev)}
        value={reverse}
        disabled={!hasATimeSelected}
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
