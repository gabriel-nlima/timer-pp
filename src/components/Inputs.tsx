import React from 'react'
import {
  Text,
  TextInput,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native'

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
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  keyProp,
  placeholder,
  inputHandler,
  onKeyPress,
  ...props
}) => (
  <>
    <Text>{label}</Text>
    <TextInput
      value={`${value || ''}`}
      placeholder={placeholder || label}
      onChangeText={text => inputHandler(text, keyProp)}
      onKeyPress={e => onKeyPress && onKeyPress(e.nativeEvent.key, keyProp)}
      {...props}
    />
  </>
)
