import React, { memo, useState } from 'react'
import { View, Button } from 'react-native'
import { MessageType } from './types'
import { Input } from './components/Inputs'

interface Props {
  setMessage: (msg: MessageType) => void
  playing: boolean
  message?: MessageType
}

const MessageForm: React.FC<Props> = ({ message, playing, setMessage }) => {
  const [data, setData] = useState(message)

  const inputHandler = (value: string, key: keyof MessageType | string) => {
    setData(
      prev =>
        ({
          ...prev,
          [key]: key === 'step' ? Number(value) : value,
        } as MessageType),
    )
  }

  const handleSubmit = () => {
    if (!playing && data && data.step && data.msg) {
      setMessage(data)
    }
  }

  return (
    <View>
      <Input
        label="Intervalo (em segundos)"
        keyProp="step"
        value={data?.step}
        keyboardType="number-pad"
        inputHandler={inputHandler}
        editable={!playing}
      />
      <Input
        label="Mensagem"
        keyProp="msg"
        value={data?.msg}
        inputHandler={inputHandler}
        editable={!playing}
      />
      <Button onPress={handleSubmit} title="Adicionar" disabled={playing} />
    </View>
  )
}

export default memo(MessageForm)
