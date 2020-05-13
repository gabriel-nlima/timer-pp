import React, { memo, useCallback, useEffect, useRef } from 'react'
import { Button, IconButton } from 'react-native-paper'
import { View } from 'react-native'
import { AlertType } from './types'
import { Input } from '../../components/Inputs'
import { Row, ScrollContainer } from '../../components/Containers'
import { mainColors } from '../../theme'

interface Props {
  isStarted: boolean
  setAlerts: React.Dispatch<React.SetStateAction<AlertType[]>>
  alerts: AlertType[]
}

const emptyAlert: AlertType = {
  step: 0,
  msg: '',
  active: false,
}
const AlertForm: React.FC<Props> = ({ isStarted, setAlerts, alerts }) => {
  const inputsRef = useRef<any[]>([])
  useEffect(() => {
    if (alerts.length === 0) {
      setAlerts([{ ...emptyAlert }])
    }
    // Foca o primeiro input de intervalo
    if (alerts.length === 1 && inputsRef.current[0] !== undefined) {
      inputsRef.current[0].focus()
    }
  }, [alerts.length, setAlerts])

  const inputHandler = (value: string, key: string, index: number) => {
    const alertsCpy = [...alerts]
    alertsCpy[index][key] = key === 'step' ? Number(value) : value
    setAlerts(alertsCpy)
  }

  const addEmptyAlert = useCallback(() => {
    setAlerts(prevAlerts => [...prevAlerts, { ...emptyAlert }])
  }, [setAlerts])

  const removeAlerts = useCallback(
    (index: number) => {
      setAlerts(prevAlerts => {
        const alertsCpy = [...prevAlerts]
        alertsCpy.splice(index, 1)
        return alertsCpy
      })
    },
    [setAlerts],
  )

  return (
    <View>
      <ScrollContainer style={{ maxHeight: 200 }}>
        {alerts.map((alert, index, { length }) => (
          <Row justify="flex-start" key={index}>
            <Input
              keyProp="step"
              value={alert.step}
              keyboardType="number-pad"
              inputHandler={(text, key) => inputHandler(text, key, index)}
              editable={!isStarted}
              style={{ width: '18%', height: 50, marginBottom: 20 }}
              mode="flat"
              inputRef={inputsRef}
              indexRef={index}
            />
            <Input
              keyProp="msg"
              value={alert.msg}
              inputHandler={(text, key) => inputHandler(text, key, index)}
              editable={!isStarted}
              style={{ width: '62%', marginLeft: 5, marginBottom: 20, height: 50 }}
              mode="flat"
            />
            <IconButton
              icon="close"
              color={mainColors.lightGrey}
              size={22}
              onPress={() => removeAlerts(index)}
              style={{ marginBottom: 20 }}
              disabled={length === 1}
            />
          </Row>
        ))}
      </ScrollContainer>

      <Button
        icon="plus"
        mode="contained"
        style={{ width: '100%' }}
        onPress={addEmptyAlert}
        disabled={isStarted}
      >
        Adicionar
      </Button>
    </View>
  )
}

export default memo(AlertForm)
