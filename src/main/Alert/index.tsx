import React, { useState, useCallback, useEffect, createContext, useMemo } from 'react'
import useInterval from '../../hooks/useInterval'
import { AlertType } from './types'
import { useController } from '../../controllerContext'
import { States, StateActions } from '../../types/state'

type AlertValue = {
  alerts: AlertType[]
  setAlerts: React.Dispatch<React.SetStateAction<AlertType[]>>
  currentAlert?: AlertType
}
type AlertProviderProps = {
  setAlertMsg?: (msg?: string) => void
}
const AlertsContext = createContext<AlertValue | undefined>(undefined)

const AlertProvider: React.FC<AlertProviderProps> = ({ children, setAlertMsg }) => {
  const [alerts, setAlerts] = useState<AlertType[]>([])
  const [currentAlert, setCurrentAlert] = useState<AlertType | undefined>(
    alerts.find(m => m.active),
  )
  const [{ status }, dispatch] = useController()

  const isPlaying = useMemo(() => status === States.PLAYING, [status])

  useEffect(() => {
    if (status === States.RESETED && alerts.length) {
      const alertsCpy = alerts.map(alert => {
        if (alert.active) {
          alert.active = false
        }
        return alert
      })
      alertsCpy[0].active = true
      setAlerts(alertsCpy)
      setCurrentAlert(alertsCpy[0])
      setAlertMsg && setAlertMsg(undefined)
      dispatch({ type: StateActions.PAUSE })
    }
  }, [alerts, status, setAlertMsg, dispatch])

  // Ativa a mensagem com menor tempo ao iniciar/se n houver mensagem ativa
  // TODO não deixar ter mais de uma mensagem ativa
  useEffect(() => {
    if (!alerts.find(m => m.active) && alerts.length > 0) {
      const msgs = [...alerts]
      msgs[0].active = true
      setAlerts(msgs)
    }
  }, [alerts])

  useEffect(() => {
    if (!currentAlert) {
      setCurrentAlert(alerts.find(alert => alert.active))
      setAlertMsg && setAlertMsg(alerts.find(alert => alert.active)?.msg)
    }
  }, [alerts, currentAlert, setAlertMsg])

  const setNextActiveAlert = useCallback(() => {
    if (currentAlert && currentAlert.active) {
      const alertsCpy = [...alerts]
      const alertIdx = alertsCpy.findIndex(m => m.active)
      if (alertIdx > -1) {
        // Desativa a mensagem atual e ativa a próxima
        alertsCpy[alertIdx].active = false

        if (alertIdx + 1 <= alerts.length - 1) {
          alertsCpy[alertIdx + 1].active = true
          setCurrentAlert(alertsCpy[alertIdx + 1])
          setAlertMsg && setAlertMsg(alertsCpy[alertIdx + 1].msg)
        } else {
          // Chegou no final do array, ativa a primeira mensagem (com menor tempo)
          alertsCpy[0].active = true
          setCurrentAlert(alertsCpy[0])
          setAlertMsg && setAlertMsg(alertsCpy[0].msg)
        }
      }
      setAlerts(alertsCpy)
    }
  }, [alerts, currentAlert, setAlertMsg])

  // Intervalo da mensagem atual
  useInterval(
    () => {
      setNextActiveAlert()
    },
    isPlaying && currentAlert ? currentAlert.step * 1000 : undefined,
  )

  return (
    <AlertsContext.Provider value={{ alerts, setAlerts, currentAlert }}>
      {children}
    </AlertsContext.Provider>
  )
}

export const useAlertHandler = () => {
  const context = React.useContext(AlertsContext)
  if (!context) {
    throw new Error('useAlertHandler must be used within a AlertProvider')
  }
  return context
}

export default AlertProvider
