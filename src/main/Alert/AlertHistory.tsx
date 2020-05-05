import React, { useState, useEffect, memo } from 'react'
import { Text } from 'react-native'
import { AlertType } from './types'
import { useAlertHandler } from '.'
import { useController } from '../../controllerContext'
import { States } from '../../types/state'

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
    <>
      {alertsHistory.map((alert, idx) => (
        <Text key={idx}>{alert.msg}</Text>
      ))}
    </>
  )
}

export default memo(AlertHandler)
