import React, { useState, useEffect, memo } from 'react'
import { View } from 'react-native'
import { AlertType } from './types'
import { useAlertHandler } from '.'
import { useController } from '../../controllerContext'
import { States } from '../../types/state'
import { SmallList } from '../../components/Containers'
import { AlertHistoryItem, Subtitle } from '../../components/Texts'

const AlertHandler: React.FC = () => {
  const [alertsHistory, setAlertHistory] = useState<AlertType[]>([])

  const { currentAlert } = useAlertHandler()
  const [{ status }] = useController()

  useEffect(() => {
    if (status === States.RESETED) {
      setAlertHistory([])
    }
  }, [status])

  useEffect(() => {
    // Adiciona o alerta atual no histórico
    !!currentAlert &&
      setAlertHistory(prevAlerts => [
        {
          ...currentAlert,
          msg: `${currentAlert.msg} (${prevAlerts.length + 1})`,
        },
        ...prevAlerts,
      ])
  }, [currentAlert])

  return (
    <View>
      {alertsHistory.length > 0 && <Subtitle>Histórico de alertas</Subtitle>}
      <SmallList>
        {alertsHistory.map((alert, idx) => (
          <AlertHistoryItem key={idx}>{alert.msg}</AlertHistoryItem>
        ))}
      </SmallList>
    </View>
  )
}

export default memo(AlertHandler)
