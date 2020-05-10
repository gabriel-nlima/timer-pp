import React, { useState, memo, useCallback, useEffect } from 'react'
import useInterval from '../../hooks/useInterval'
import DisplayTime from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States, StateActions } from '../../types/state'
import { Container } from '../../components/Containers'
import Controls from '../Controls'

interface Props {
  setLoops: React.Dispatch<React.SetStateAction<number[]>>
}
const Cron: React.FC<Props> = ({ setLoops }) => {
  const [time, setTime] = useState(0)
  const [{ status }, dispatch] = useController()

  useInterval(() => setTime(prevTime => prevTime + 1), status === States.STARTED ? 1000 : undefined)

  useEffect(() => {
    if (status === States.RESETED) {
      dispatch({ type: StateActions.STOP })
    }
  }, [status, dispatch])

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
