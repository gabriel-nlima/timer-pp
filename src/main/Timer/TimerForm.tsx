/* eslint-disable prefer-destructuring */
import React, { useState, memo, useMemo, useCallback, useRef } from 'react'
import { Container } from '../../components/Containers'
import { TimeObj } from './types'
import { useController } from '../../controllerContext'
import { States } from '../../types/state'
import { InputTime } from '../../components/Inputs'
import Controls from '../Controls'

interface Props {
  isReverse: boolean
  setTime: React.Dispatch<React.SetStateAction<number>>
  resetTimer: () => void
  onClickLoop: () => void
  setMaxTime?: React.Dispatch<React.SetStateAction<number>>
}
const TimerForm: React.FC<Props> = ({
  isReverse,
  setTime,
  setMaxTime,
  resetTimer,
  ...controlProps
}) => {
  const [selectedTime, setSelectedTime] = useState<TimeObj>({
    hours: '',
    minutes: '',
    seconds: '',
  })
  const excedents = useRef('')

  const [{ status }] = useController()
  const isPlaying = useMemo(() => status === States.PLAYING, [status])

  const hasATimeSelected = useMemo(
    () =>
      !!selectedTime.hours.length || !!selectedTime.minutes.length || !!selectedTime.seconds.length,
    [selectedTime],
  )

  const onPlay = useCallback(async () => {
    if (hasATimeSelected) {
      const { hours, minutes, seconds } = selectedTime
      const totalInSeconds = Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds)
      isReverse ? setTime(totalInSeconds) : setMaxTime && setMaxTime(totalInSeconds)
    }
  }, [hasATimeSelected, selectedTime, setMaxTime, setTime, isReverse])

  // TODO Play/Reset limpa os inputs?
  const inputHandler = (value: string, key: string) => {
    // esta apagando os segundos quando tem minutos ou horas...
    // move a hora pra minutos, minutos pra segundos
    if (
      value.length <= 1 &&
      (selectedTime.hours.length || selectedTime.minutes.length) &&
      key === 'seconds'
    ) {
      let hours = ''
      let hourToMinute = ''
      let minutes = ''
      let minuteToSeconts = ''
      let seconds = ''

      // passa a hora para os minutos...
      if (selectedTime.hours.length) {
        if (selectedTime.hours.length === 2) {
          hours = selectedTime.hours[0]
          hourToMinute = selectedTime.hours[1]
        } else if (selectedTime.hours.length === 1) {
          hours = ''
          hourToMinute = selectedTime.hours[0]
        }
      }

      // passa os minutos para os segundos
      if (selectedTime.minutes.length) {
        if (selectedTime.minutes.length === 2) {
          minutes = selectedTime.minutes[0]
          minuteToSeconts = selectedTime.minutes[1]
        } else if (selectedTime.minutes.length === 1) {
          minutes = ''
          minuteToSeconts = selectedTime.minutes[0]
        }
      }

      if (selectedTime.seconds.length > 0) {
        seconds = selectedTime.seconds
      }
      if (hourToMinute.length > 0) {
        if (minutes.length > 0) {
          minutes = hourToMinute + minutes
        } else {
          minutes = hourToMinute
        }
      }
      if (minuteToSeconts.length > 0) {
        if (seconds.length > 0) {
          seconds = minuteToSeconts + seconds[0]
        }
      }
      console.log(seconds, minutes, hours)

      setSelectedTime({ seconds, minutes, hours })
    } else if (value.length > 1) {
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

  return (
    <Container align="center">
      {!isPlaying && (
        <InputTime inputHandler={inputHandler} selectedTime={selectedTime} isPlaying={isPlaying} />
      )}
      <Controls
        onPlay={onPlay}
        onReset={resetTimer}
        {...controlProps}
        setTime={!isReverse ? setTime : undefined}
        btnDisabled={!hasATimeSelected}
      />
    </Container>
  )
}

export default memo(TimerForm)
