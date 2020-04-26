import React, { useState, memo, useMemo } from 'react'
import { View, Button } from 'react-native'
import useInterval from '../../hooks/useInterval'
import DisplayTime from '../../components/DisplayTime'
import { useController } from '../../controllerContext'
import { States, StateActions } from '../../types/state'

const Timer: React.FC = () => {
  const [time, setTime] = useState(0)
  const [loops, setLoops] = useState<number[]>([])
  const [{ status }, dispatch] = useController()

  const isPlaying = useMemo(() => status === States.PLAYING, [status])

  useInterval(
    () => {
      setTime(prevTime => prevTime + 1)
    },
    isPlaying ? 1000 : undefined,
  )
  const onPlay = () => {
    dispatch({ type: isPlaying ? StateActions.PAUSE : StateActions.PLAY })
  }

  const resetTimer = () => {
    dispatch({ type: StateActions.RESET })
    setTime(0)
    setLoops([])
  }

  return (
    <View>
      <DisplayTime time={time} />
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
