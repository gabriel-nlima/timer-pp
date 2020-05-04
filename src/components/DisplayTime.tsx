import React, { useMemo, memo } from 'react'
import { TimerText, LoopText } from './Texts'
import { Container } from './Containers'

interface Props {
  time: number
}

const DisplayTime: React.FC<Props> = ({ time }) => {
  const timeString = useMemo(() => new Date(time * 1000).toISOString().substr(11, 8), [time])

  return (
    <Container align="center">
      <TimerText>{timeString}</TimerText>
    </Container>
  )
}
export const DisplayLoop: React.FC<Props> = ({ time }) => {
  const timeString = useMemo(() => new Date(time * 1000).toISOString().substr(11, 8), [time])

  return (
    <Container align="flex-end">
      <LoopText>{timeString}</LoopText>
    </Container>
  )
}

export default memo(DisplayTime)
