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
  isPlaying: boolean
  circle?: boolean
  onPress?: () => void
  isStarted?: number | undefined
}
export const PlayPauseBtn: React.FC<PlayPauseBtnProps> = ({
  children,
  isStarted,
  isPlaying,
  ...props
}) => {
  return (
    <CustomButton
      {...props}
      compact
      mode="contained"
      icon={isStarted ? undefined : isPlaying ? 'pause' : 'play'}
      contentStyle={{ height: 60, width: 60 }}
      style={{ borderRadius: 70 }}
      labelStyle={{ fontSize: 20 }}
    >
      {children}
    </CustomButton>
  )
}
