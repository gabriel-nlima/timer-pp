import React, { useMemo, memo } from 'react'
import { TimerText } from './Texts'
import { Container } from './Containers'

interface Props {
  time: number
  indeterminate: boolean
}

const DisplayTime: React.FC<Props> = ({ time, indeterminate = true }) => {
  const timeString = useMemo(() => new Date(time * 1000).toISOString().substr(11, 8), [time])

  return (
    <Container align="center">
      <TimerText>{timeString}</TimerText>
    </Container>
  )
}

export default memo(DisplayTime)
