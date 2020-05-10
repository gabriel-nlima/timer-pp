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
  btnDisabled?: boolean
}

const Controls: React.FC<Props> = ({
  onPlay,
  onPause,
  onReset,
  onClickLoop,
  setTime,
  btnDisabled,
}) => {
  const [toStartIn, setToStartIn] = useState<number | undefined>()
  const [{ status }, dispatch] = useController()

  const isStarted = useMemo(() => status === States.STARTED, [status])

  // Espera 3 segundos antes de iniciar
  useInterval(
    () => {
      setToStartIn(prev => (prev && prev >= 1 ? prev - 1 : 0))
      if (toStartIn === 1) {
        dispatch({ type: StateActions.START })
      }
    },
    toStartIn ? 1000 : undefined,
  )

  useEffect(() => {
    if (toStartIn === 0 && status === States.STOPPED) {
      setToStartIn(undefined)
      setTime && setTime(0)
    }
  }, [toStartIn, isStarted, setTime, status])

  const onPressStart = useCallback(() => {
    if (toStartIn === undefined) {
      onPlay && onPlay()
      setToStartIn(3)
    } else {
      dispatch({ type: StateActions.START })
    }
  }, [onPlay, toStartIn, dispatch])

  const onPressPause = useCallback(() => {
    onPause && onPause()
    dispatch({ type: StateActions.PAUSE })
    setToStartIn(0)
  }, [dispatch, onPause])

  const onPressReset = useCallback(() => {
    onReset && onReset()
    dispatch({ type: StateActions.RESET })
    setToStartIn(undefined)
  }, [dispatch, onReset])

  return (
    <ButtonGroup>
      <CustomButton compact onPress={onPressReset}>
        Zerar
      </CustomButton>
      <PlayPauseBtn
        onPress={() => (isStarted ? onPressPause() : onPressStart())}
        toStartIn={toStartIn}
        isStarted={isStarted}
        disabled={btnDisabled}
      >
        {toStartIn ? `${toStartIn}` : undefined}
      </PlayPauseBtn>
      {!!onClickLoop && (
        <CustomButton compact onPress={onClickLoop} disabled={!isStarted}>
          Volta
        </CustomButton>
      )}
    </ButtonGroup>
  )
}

export default memo(Controls)
