import React, { memo, useMemo, useCallback, useState, useEffect } from 'react'
import { useController } from '../controllerContext'
import { States, StateActions } from '../types/state'
import useInterval from '../hooks/useInterval'
import { CustomButton, ButtonGroup, PlayPauseBtn } from '../components/Buttons'

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
    <ButtonGroup>
      <CustomButton compact onPress={onPressReset}>
        Zerar
      </CustomButton>
      <PlayPauseBtn
        onPress={() => (isPlaying ? onPressPause() : onPressPlay())}
        isStarted={isStarted}
        isPlaying={isPlaying}
      >
        {isStarted ? `${isStarted}` : undefined}
      </PlayPauseBtn>
      {!!onClickLoop && (
        <CustomButton compact onPress={onClickLoop} disabled={!isPlaying}>
          Volta
        </CustomButton>
      )}
    </ButtonGroup>
  )
}

export default memo(Controls)
