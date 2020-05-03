import React from 'react'
import { Text, StyleProp, TextStyle } from 'react-native'
import { TextInput } from 'react-native-paper'

interface InputProps {
  label: string
  keyProp: string
  editable: boolean
  inputHandler: (value: any, key: string) => void
  value?: any
  placeholder?: string
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
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  keyProp,
  placeholder,
  inputHandler,
  onKeyPress,
  onSubmitEditing,
  editable,
  ...props
}) => (
  <>
    <Text>{label}</Text>
    <TextInput
      mode="outlined"
      value={`${value || ''}`}
      placeholder={placeholder || label}
      onChangeText={text => inputHandler(text, keyProp)}
      onKeyPress={e => onKeyPress && onKeyPress(e.nativeEvent.key, keyProp)}
      onSubmitEditing={e => onSubmitEditing && onSubmitEditing(e.nativeEvent.text, keyProp)}
      disabled={!editable}
      {...props}
    />
  </>
)
