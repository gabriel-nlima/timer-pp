import React, { useState, useCallback, useEffect, createContext, useMemo } from 'react'
import { AlertType } from './types'
import { useController } from '../../controllerContext'
import { States } from '../../types/state'

type AlertValue = {
  alerts: AlertType[]
  setAlerts: React.Dispatch<React.SetStateAction<AlertType[]>>
  currentAlert?: AlertType
}
type AlertProviderProps = {
  done: boolean
  setDone: React.Dispatch<React.SetStateAction<boolean>>
  setAlert?: (alert?: AlertType) => void
}
const AlertsContext = createContext<AlertValue | undefined>(undefined)

const AlertProvider: React.FC<AlertProviderProps> = ({ children, setAlert, done, setDone }) => {
  const [alerts, setAlerts] = useState<AlertType[]>([])
  const [currentAlert, setCurrentAlert] = useState<AlertType | undefined>(
    alerts.find(m => m.active),
  )
  const [{ status }] = useController()

  const isStarted = useMemo(() => status === States.STARTED, [status])
  const isFinished = useMemo(() => status === States.RESETED || status === States.STOPPED, [status])

  useEffect(() => {
    if (isFinished) {
      setAlerts(prevAlerts => {
        const alertsCpy = prevAlerts.map(alert => {
          if (alert.active) {
            alert.active = false
          }
          return alert
        })
        alertsCpy[0].active = true
        return alertsCpy
      })
    }
  }, [isFinished])

  // Ativa a mensagem com menor tempo ao iniciar/se n houver mensagem ativa
  // TODO não deixar ter mais de uma mensagem ativa
  useEffect(() => {
    if (!alerts.find(m => m.active) && alerts.length > 0) {
      const alertsCpy = [...alerts]
      alertsCpy[0].active = true
      setAlerts(alertsCpy)
    }
  }, [alerts])

  useEffect(() => {
    setCurrentAlert(alerts.find(alert => alert.active))
    if (setAlert && (isStarted || isFinished)) {
      setAlert(alerts.find(alert => alert.active))
    }
  }, [alerts, setAlert, isStarted, isFinished])

  const setNextActiveAlert = useCallback(() => {
    if (currentAlert && currentAlert.active) {
      const alertsCpy = [...alerts]
      const alertIdx = alertsCpy.findIndex(m => m.active)
      if (alertIdx > -1) {
        // Desativa a mensagem atual e ativa a próxima
        alertsCpy[alertIdx].active = false

        if (alertIdx + 1 <= alerts.length - 1) {
          alertsCpy[alertIdx + 1].active = true
        } else {
          // Chegou no final do array, ativa a primeira mensagem
          alertsCpy[0].active = true
        }
      }
      setAlerts(alertsCpy)
      setDone(false)
    }
  }, [alerts, currentAlert, setDone])

  // quando done mudar, troca a mensagem atual
  useEffect(() => {
    if (done) {
      setNextActiveAlert()
    }
  }, [done, setNextActiveAlert])

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
