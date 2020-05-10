import React from 'react'
import { Button } from 'react-native-paper'
import styled from 'styled-components/native'

export const ButtonGroup = styled.View`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin: 5px;
`
export const CustomButton = styled(Button)``

type PlayPauseBtnProps = {
  isStarted: boolean
  onPress?: () => void
  toStartIn?: number
  disabled?: boolean
}
export const PlayPauseBtn: React.FC<PlayPauseBtnProps> = ({
  children,
  toStartIn,
  isStarted,
  disabled,
  ...props
}) => {
  return (
    <CustomButton
      {...props}
      compact
      mode="contained"
      icon={toStartIn ? undefined : isStarted ? 'pause' : 'play'}
      contentStyle={{ height: 60, width: 60 }}
      style={{ borderRadius: 70 }}
      labelStyle={{ fontSize: 20 }}
      disabled={!!toStartIn || disabled}
    >
      {children}
    </CustomButton>
  )
}
