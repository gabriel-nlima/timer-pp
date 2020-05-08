import React, { memo, useState } from 'react'
import { Button, IconButton } from 'react-native-paper'
import { View } from 'react-native'
import { AlertType } from './types'
import { Input } from '../../components/Inputs'
import { Row } from '../../components/Containers'
import { mainColors } from '../../theme'

interface Props {
  isPlaying: boolean
  setAlerts: React.Dispatch<React.SetStateAction<AlertType[]>>
}

const AlertForm: React.FC<Props> = ({ isPlaying, setAlerts }) => {
  const [data, setData] = useState<AlertType | undefined>({ active: false } as AlertType)

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
      <Row justify="flex-start">
        <Input
          keyProp="step"
          value={data?.step}
          keyboardType="number-pad"
          inputHandler={inputHandler}
          editable={!isPlaying}
          style={{ width: '18%', height: 50, marginBottom: 20 }}
          mode="flat"
        />
        <Input
          keyProp="msg"
          value={data?.msg}
          inputHandler={inputHandler}
          editable={!isPlaying}
          style={{ width: '62%', marginLeft: 5, marginBottom: 20, height: 50 }}
          mode="flat"
        />
        <IconButton
          icon="close"
          color={mainColors.lightGrey}
          size={22}
          onPress={() => console.log('Pressed')}
          style={{ marginBottom: 20 }}
        />
      </Row>
      <Button
        icon="plus"
        mode="contained"
        style={{ width: '100%' }}
        onPress={handleSubmit}
        disabled={isPlaying}
      >
        Adicionar
      </Button>
    </View>
  )
}

export default memo(AlertForm)
