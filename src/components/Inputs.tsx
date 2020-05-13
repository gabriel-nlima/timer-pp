import React from 'react'
import { StyleProp, TextStyle, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import styled from 'styled-components/native'
import { fontSizes, mainColors } from '../theme'
import { TimeObj } from '../main/Timer/types'

interface InputProps {
  label?: string
  keyProp: string
  editable: boolean
  inputHandler: (value: any, key: string) => void
  value?: any
  placeholder?: string
  mode?: 'flat' | 'outlined'
  testID?: string
  style?: StyleProp<TextStyle>
  keyboardAppearance?: 'default' | 'light' | 'dark'
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search'
  onKeyPress?: (e: any, key: string) => void
  onSubmitEditing?: (e: any, key: string) => void
  inputRef?: any
  indexRef?: number
}

export const Input: React.FC<InputProps> = ({
  label,
  mode,
  value,
  keyProp,
  inputHandler,
  onKeyPress,
  onSubmitEditing,
  editable,
  inputRef,
  indexRef,
  ...props
}) => (
  <TextInput
    label={label}
    mode={mode || 'outlined'}
    value={`${value || ''}`}
    placeholder=""
    onChangeText={text => inputHandler(text, keyProp)}
    onKeyPress={e => onKeyPress && onKeyPress(e.nativeEvent.key, keyProp)}
    onSubmitEditing={e => onSubmitEditing && onSubmitEditing(e.nativeEvent.text, keyProp)}
    disabled={!editable}
    editable={editable}
    underlineColor={mainColors.lightGrey}
    ref={input => {
      if (inputRef) {
        if (indexRef !== undefined) {
          inputRef.current[indexRef] = input
        } else {
          inputRef.current = input
        }
      }
    }}
    {...props}
  />
)

const TimeText = styled.Text`
  font-size: ${fontSizes.titles};
  color: ${mainColors.lightGrey};
`

const { timerInput } = StyleSheet.create({
  timerInput: {
    height: 32,
    width: 40,
    backgroundColor: mainColors.darkGrey,
  },
})

export const InputTimeGroup = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: row;
`

interface InputTimeProps {
  selectedTime: TimeObj
  isStarted: boolean
  inputHandler: (value: any, key: string) => void
  onKeyPress?: (e: any, key: string) => void
}
export const InputTime: React.FC<InputTimeProps> = ({
  selectedTime,
  isStarted,
  inputHandler,
  onKeyPress,
}) => {
  return (
    <InputTimeGroup>
      <Input
        mode="flat"
        label=""
        keyProp="hours"
        value={selectedTime.hours}
        keyboardType="number-pad"
        inputHandler={inputHandler}
        editable={false}
        style={timerInput}
      />
      {!!selectedTime.hours.length && <TimeText>h</TimeText>}
      <Input
        mode="flat"
        label=""
        keyProp="minutes"
        value={selectedTime.minutes}
        keyboardType="number-pad"
        inputHandler={inputHandler}
        editable={false}
        style={timerInput}
      />
      {!!selectedTime.minutes.length && <TimeText>m</TimeText>}
      <Input
        mode="flat"
        label=""
        keyProp="seconds"
        value={selectedTime.seconds}
        keyboardType="number-pad"
        inputHandler={inputHandler}
        editable={!isStarted}
        onKeyPress={onKeyPress}
        style={timerInput}
      />
      <TimeText>s</TimeText>
    </InputTimeGroup>
  )
}
