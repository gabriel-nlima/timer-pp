import React, { memo, useState, useMemo } from 'react'
import { View, Button } from 'react-native'
import { AlertType } from '../../types/alert'
import { Input } from '../../components/Inputs'
import { useAlertHandler } from '.'
import { useController } from '../../controllerContext'
import { States } from '../../types/state'

const AlertForm: React.FC = () => {
  const [data, setData] = useState<AlertType | undefined>({ active: false } as AlertType)

  const [{ status }] = useController()
  const { setAlerts } = useAlertHandler()

  const isPlaying = useMemo(() => status === States.PLAYING, [status])

  const inputHandler = (value: string, key: keyof AlertType | string) => {
    setData(
      prev =>
        ({
          ...prev,
          [key]: key === 'step' ? Number(value) : value,
        } as AlertType),
    )
  }

  const handleSubmit = () => {
    if (!isPlaying && data && data.step && data.msg) {
      setAlerts(prevAlerts => [...prevAlerts, data])
      setData({ active: false } as AlertType)
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
        editable={!isPlaying}
      />
      <Input
        label="Mensagem"
        keyProp="msg"
        value={data?.msg}
        inputHandler={inputHandler}
        editable={!isPlaying}
      />
      <Button onPress={handleSubmit} title="Adicionar" disabled={isPlaying} />
    </View>
  )
}

export default memo(AlertForm)
