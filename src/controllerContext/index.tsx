import React, { createContext, useReducer } from 'react'
import { ControlState, ControlActions } from './controlType'
import { States } from '../types/state'
import { controlReducer } from './reducer'

type ControlDispatch = (action: ControlActions) => void

const ControlStateContext = createContext<ControlState | undefined>(undefined)
const ControlDispatchContext = createContext<ControlDispatch | undefined>(undefined)

export const ControllerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(controlReducer, { status: States.PAUSED })
  return (
    <ControlStateContext.Provider value={state}>
      <ControlDispatchContext.Provider value={dispatch}>{children}</ControlDispatchContext.Provider>
    </ControlStateContext.Provider>
  )
}

const useControllerState = () => {
  const context = React.useContext(ControlStateContext)
  if (!context) {
    throw new Error('useControllerState must be used within a ControllerStateContext')
  }
  return context
}
const useControllerDispatch = () => {
  const context = React.useContext(ControlDispatchContext)
  if (!context) {
    throw new Error('useControllerDispatch must be used within a ControllerStateContext')
  }
  return context
}

export function useController(): [ControlState, ControlDispatch] {
  return [useControllerState(), useControllerDispatch()]
}
