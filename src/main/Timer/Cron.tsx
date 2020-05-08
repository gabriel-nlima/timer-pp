import React, { useState, memo, useMemo, useCallback } from 'react'
import useInterval from '../../hooks/useInterval'
import DisplayTime, { DisplayLoop } from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States } from '../../types/state'
import { Container } from '../../components/Containers'
import Controls from '../Controls'

const Cron: React.FC = () => {
  const [time, setTime] = useState(0)
  const [loops, setLoops] = useState<number[]>([])
  const [{ status }] = useController()

  const isPlaying = useMemo(() => status === States.PLAYING, [status])

  useInterval(() => setTime(prevTime => prevTime + 1), isPlaying ? 1000 : undefined)

  const resetTimer = useCallback(() => {
    setTime(0)
    setLoops([])
  }, [])

  return (
    <Container>
      <DisplayTime time={time} />
      <Controls onReset={resetTimer} onClickLoop={() => setLoops(prev => [time, ...prev])} />
      {loops.map((loop, idx) => (
        <DisplayLoop key={idx} time={loop} />
      ))}
    </Container>
  )
}

export default memo(Cron)
