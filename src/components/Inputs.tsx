import React from 'react'
import { Text, TextInput, StyleProp, TextStyle } from 'react-native'

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
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  keyProp,
  placeholder,
  inputHandler,
  ...props
}) => (
  <>
    <Text>{label}</Text>
    <TextInput
      value={value ? `${value}` : undefined}
      placeholder={placeholder || label}
      onChangeText={text => inputHandler(text, keyProp)}
      {...props}
    />
  </>
)
