/* eslint-disable prefer-destructuring */
import React, { useState, memo, useMemo, useCallback } from 'react'
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
  onPlayInReverse?: (seconds: number) => void
  setMaxTime?: React.Dispatch<React.SetStateAction<number>>
}
const TimerForm: React.FC<Props> = ({
  isReverse,
  setTime,
  setMaxTime,
  resetTimer,
  onPlayInReverse,
  ...controlProps
}) => {
  const [selectedTime, setSelectedTime] = useState<TimeObj>({
    hours: '',
    minutes: '',
    seconds: '',
  })

  const [{ status }] = useController()
  const isStarted = useMemo(() => status === States.STARTED, [status])

  const hasATimeSelected = useMemo(
    () =>
      !!selectedTime.hours.length || !!selectedTime.minutes.length || !!selectedTime.seconds.length,
    [selectedTime],
  )

  const onPlay = useCallback(async () => {
    if (hasATimeSelected) {
      const { hours, minutes, seconds } = selectedTime
      const totalInSeconds = Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds)
      isReverse ? onPlayInReverse!(totalInSeconds) : setMaxTime!(totalInSeconds)
    }
  }, [hasATimeSelected, selectedTime, setMaxTime, onPlayInReverse, isReverse])

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

      setSelectedTime({ seconds, minutes, hours })
    } else if (value.length > 2) {
      // inserindo
      let seconds = ''
      let secondsToMinutes = ''
      let minutes = ''
      let minutesToHours = ''
      let hours = ''

      // Por aqui o value.length sempre será 3
      // os segundos são os dois ultimos
      // o minuto é o primeiro
      seconds = value.substring(value.length - 2, value.length)
      secondsToMinutes = value[0]

      // Passa os segundos para minutos...
      if (selectedTime.minutes.length === 0) {
        // Não tinha minuto, logo o primeiro segundo é o primeiro minuto
        minutes = secondsToMinutes
      } else if (selectedTime.minutes.length === 1) {
        // Já tinha um minuto, junta com o primeiro segundo
        minutes = selectedTime.minutes[0] + secondsToMinutes
      } else if (selectedTime.minutes.length === 2) {
        // já tem dois em minutos, passa o primeiro para horas
        // e guarda os dois ultimos como segundos
        minutesToHours = selectedTime.minutes[0]
        minutes = selectedTime.minutes[1] + secondsToMinutes
      }

      // Passa os minutos para horas
      if (selectedTime.hours.length === 0) {
        // Não tinha hora, logo, o primeiro minuto excedente é a primeira hora
        hours = minutesToHours
      } else if (selectedTime.hours.length === 1) {
        // Já tinha uma hora, junta com o primeiro minuto
        hours = selectedTime.hours[0] + minutesToHours
      } else if (selectedTime.hours.length === 2) {
        // já tinha dois em horas, guarda o ultimo com o primeiro minuto
        // a outra hora é perdida
        hours = selectedTime.hours[1] + minutesToHours
      }

      setSelectedTime({ seconds, minutes, hours })
    } else {
      setSelectedTime(prev => ({ ...prev, [key]: value }))
    }
  }

  return (
    <Container align="center">
      {!isStarted && (
        <InputTime inputHandler={inputHandler} selectedTime={selectedTime} isStarted={isStarted} />
      )}
      <Controls
        onPlay={onPlay}
        onReset={resetTimer}
        setTime={!isReverse ? setTime : undefined}
        btnDisabled={!hasATimeSelected}
        {...controlProps}
      />
    </Container>
  )
}

export default memo(TimerForm)
