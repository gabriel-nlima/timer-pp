import React, { useState, memo, useMemo, useCallback, useRef } from 'react'
import { Button } from 'react-native'
import { Container } from '../../components/Containers'
import { TimeObj } from './Timer'
import { useController } from '../../controllerContext'
import { States, StateActions } from '../../types/state'
import { Input } from '../../components/Inputs'

interface Props {
  isReverse: boolean
  setTime: React.Dispatch<React.SetStateAction<number>>
  setMaxTime: React.Dispatch<React.SetStateAction<number>>
}
const TimerForm: React.FC<Props> = ({ isReverse, setTime, setMaxTime }) => {
  const [selectedTime, setSelectedTime] = useState<TimeObj>({
    hours: '',
    minutes: '',
    seconds: '',
  })
  const excedents = useRef('')

  const [{ status }, dispatch] = useController()
  const isPlaying = useMemo(() => status === States.PLAYING, [status])

  const hasATimeSelected = useMemo(
    () =>
      !!selectedTime.hours.length || !!selectedTime.minutes.length || !!selectedTime.seconds.length,
    [selectedTime],
  )

  const onPlay = useCallback(() => {
    if (hasATimeSelected) {
      const { hours, minutes, seconds } = selectedTime
      const totalInSeconds = Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds)
      isReverse ? setTime(totalInSeconds) : setMaxTime(totalInSeconds)
      dispatch({ type: isPlaying ? StateActions.PAUSE : StateActions.PLAY })
    }
  }, [hasATimeSelected, selectedTime, setMaxTime, setTime, isReverse, dispatch, isPlaying])

  // TODO Play/Reset limpa os inputs?
  const inputHandler = (value: string, key: string) => {
    if (value.length > 2) {
      switch (key) {
        case 'seconds': {
          excedents.current += value.substring(0, value.length - 2)
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

  const onKeyPress = (e: any) => {
    if (e === 'Backspace') {
      setSelectedTime(prev => {
        let hours = ''
        let hourToMinute = ''
        let minutes = ''
        let minuteToSeconts = ''
        let seconds = ''

        if (prev.hours.length > 1) {
          // Esse ; é por causa do prettier...
          ;[hours, hourToMinute] = [...prev.hours]
        } else {
          ;[hours, hourToMinute] = ['', prev.hours[0] ? prev.hours[0] : '']
        }

        if (prev.minutes.length > 1) {
          ;[minutes, minuteToSeconts] = [...prev.minutes]
        } else {
          ;[minutes, minuteToSeconts] = ['', prev.minutes[0] ? prev.minutes[0] : '']
        }

        if (prev.seconds.length >= 1) {
          if (minuteToSeconts.length === 1) {
            seconds = minuteToSeconts + prev.seconds
          } else {
            ;[seconds] = [prev.seconds[0]]
          }
        }
        if (seconds.length <= 1) {
          excedents.current = ''
        }

        return {
          hours,
          minutes: hourToMinute.length ? hourToMinute + minutes : minutes,
          seconds: minuteToSeconts.length === 1 ? seconds : prev.seconds,
        }
      })
    }
  }

  return (
    <Container>
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
        keyboardType="numeric"
        inputHandler={inputHandler}
        editable={!isPlaying}
        onKeyPress={onKeyPress}
      />
      <Button onPress={onPlay} title="Vai" disabled={!hasATimeSelected} />
    </Container>
  )
}

export default memo(TimerForm)
