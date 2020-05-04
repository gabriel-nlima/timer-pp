import React, { memo, useMemo, useCallback, useState, useEffect } from 'react'
import { Button } from 'react-native'
import { useController } from '../controllerContext'
import { States, StateActions } from '../types/state'
import { Container } from '../components/Containers'
import useInterval from '../hooks/useInterval'

type Props = {
  onPlay?: () => void
  onPause?: () => void
  onReset?: () => void
  onClickLoop?: () => void
  setTime?: React.Dispatch<React.SetStateAction<number>>
}

const Controls: React.FC<Props> = ({ onPlay, onPause, onReset, onClickLoop, setTime }) => {
  const [isStarted, setIsStarted] = useState<number | undefined>()
  const [{ status }, dispatch] = useController()

  const isPlaying = useMemo(() => status === States.PLAYING, [status])

  // Espera 3 segundos antes de iniciar
  useInterval(
    () => {
      setIsStarted(prev => (prev && prev >= 1 ? prev - 1 : 0))
      if (isStarted === 1) {
        dispatch({ type: StateActions.PLAY })
      }
    },
    isStarted ? 1000 : undefined,
  )

  useEffect(() => {
    if (isStarted === 0 && isPlaying) {
      setIsStarted(undefined)
      setTime && setTime(0)
    }
  }, [isStarted, isPlaying, setTime])

  const onPressPlay = useCallback(() => {
    if (isStarted === undefined) {
      onPlay && onPlay()
      setIsStarted(3)
    } else {
      dispatch({ type: StateActions.PLAY })
    }
  }, [onPlay, isStarted, dispatch])

  const onPressPause = useCallback(() => {
    onPause && onPause()
    dispatch({ type: StateActions.PAUSE })
    setIsStarted(0)
  }, [dispatch, onPause])

  const onPressReset = useCallback(() => {
    onReset && onReset()
    dispatch({ type: StateActions.RESET })
    setIsStarted(undefined)
  }, [dispatch, onReset])

  return (
    <Container>
      <Button
        onPress={() => (isPlaying ? onPressPause() : onPressPlay())}
        title={isStarted ? `${isStarted}` : isPlaying ? 'Pausar' : 'Vai'}
      />
      <Button onPress={onPressReset} title="Zerar" />
      {!!onClickLoop && <Button onPress={onClickLoop} disabled={!isPlaying} title="Volta" />}
    </Container>
  )
}

export default memo(Controls)
