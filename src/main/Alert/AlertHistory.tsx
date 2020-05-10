import React, { useState, useEffect, memo } from 'react'
import { View } from 'react-native'
import { AlertType } from './types'
import { useAlertHandler } from '.'
import { useController } from '../../controllerContext'
import { States } from '../../types/state'
import { SmallList } from '../../components/Containers'
import { AlertHistoryItem, Subtitle } from '../../components/Texts'
import { mainColors } from '../../theme'

const AlertHandler: React.FC = () => {
  const [alertsHistory, setAlertHistory] = useState<AlertType[]>([])

  const { currentAlert } = useAlertHandler()
  const [{ status }] = useController()

  useEffect(() => {
    if (status === States.STOPPED) {
      setAlertHistory([])
    }
  }, [status])

  useEffect(() => {
    // Adiciona o alerta atual no histórico
    !!currentAlert &&
      status === States.STARTED &&
      setAlertHistory(prevAlerts => [
        {
          ...currentAlert,
          msg: `${currentAlert.msg} (${prevAlerts.length + 1})`,
        },
        ...prevAlerts,
      ])
  }, [currentAlert, status])

  return (
    <View>
      {alertsHistory.length > 0 && <Subtitle>Histórico de alertas</Subtitle>}
      <SmallList>
        {alertsHistory.map((alert, idx) => (
          <AlertHistoryItem key={idx} color={idx === 0 ? mainColors.lightBLue : undefined}>
            {alert.msg}
          </AlertHistoryItem>
        ))}
      </SmallList>
    </View>
  )
}

export default memo(AlertHandler)
