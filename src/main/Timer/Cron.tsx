import React, { useState, memo, useMemo, useCallback } from 'react'
import useInterval from '../../hooks/useInterval'
import DisplayTime from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States } from '../../types/state'
import { Container } from '../../components/Containers'
import Controls from '../Controls'

interface Props {
  setLoops: React.Dispatch<React.SetStateAction<number[]>>
}
const Cron: React.FC<Props> = ({ setLoops }) => {
  const [time, setTime] = useState(0)
  const [{ status }] = useController()

  const isPlaying = useMemo(() => status === States.PLAYING, [status])

  useInterval(() => setTime(prevTime => prevTime + 1), isPlaying ? 1000 : undefined)

  const resetTimer = useCallback(() => {
    setTime(0)
    setLoops([])
  }, [setLoops])

  return (
    <Container>
      <DisplayTime time={time} />
      <Controls onReset={resetTimer} onClickLoop={() => setLoops(prev => [time, ...prev])} />
    </Container>
  )
}

export default memo(Cron)
