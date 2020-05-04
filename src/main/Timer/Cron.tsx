import React, { useState, memo, useMemo, useCallback } from 'react'
import { RouteProp } from '@react-navigation/native'
import useInterval from '../../hooks/useInterval'
import DisplayTime, { DisplayLoop } from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States } from '../../types/state'
import { MainContainer, Container } from '../../components/Containers'
import { DrawerScreens } from '../../types/navigation'
import Controls from '../Controls'
import { MainTitle } from '../../components/Texts'

export interface TimeObj {
  hours: string
  minutes: string
  seconds: string
}

type TimerScreenProps = RouteProp<DrawerScreens, 'Cron'>
type Props = {
  route: TimerScreenProps
}

const Cron: React.FC<Props> = () => {
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
    <MainContainer>
      <Container align="center">
        <MainTitle>Cronômetro</MainTitle>
      </Container>
      <DisplayTime time={time} />
      <Controls onReset={resetTimer} onClickLoop={() => setLoops(prev => [time, ...prev])} />
      {loops.map((loop, idx) => (
        <DisplayLoop key={idx} time={loop} />
      ))}
    </MainContainer>
  )
}

export default memo(Cron)
